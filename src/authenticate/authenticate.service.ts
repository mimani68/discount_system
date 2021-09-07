import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { LoginUserDto } from './dtos/loginuser.dto';
import { PayloadDto } from './dtos/payload.dto';
import { PhoneVerificationDto } from './dtos/phoneverification.dto';
import { VerificationCodeRepository } from './repositories/verificationcode.repository'
import { VerificationCodeEntity } from './entities/verificationcode.entity';
import { VerificationCodeResponseDto } from './dtos/verificationcorereesponse.dto';
import { TokenRepository } from './repositories/token.repository';
import { TokenEntity } from './entities/token.entity';
import { RefreshTokenDto } from './dtos/refreshtoken.dto';
import { LoginGuestDto } from './dtos/loginguest.dto';


@Injectable()
export class AuthenticateService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private readonly codeRepository: VerificationCodeRepository,
        private readonly tokenRepository: TokenRepository
    ) { }


    async accessToken(dto: LoginUserDto) {

        const { phone, code } = dto;
        let isNew = false;

        //find last valid code sent to the phone number
        const currentCode = await this.codeRepository.findByPhoneAndCode(phone, code);
        //if the code does not exists or if is not valid then just reject
        if (currentCode == undefined || currentCode.code != code)
            throw new UnauthorizedException({ message: 'Unauthorized or Timeout', code: 101 });

        //if the code exists and it is valid, first of all delete it
        // await this.codeRepository.delete({ id: currentCode.id });

        //check if the user by this phone already exists or not?
        let user = await this.userService.getByPhone(phone);

        //if user does not exists, first create and store it
        if (user == undefined) {
            isNew = true;
            const userDto = new CreateUserDto(phone);
            user = await this.userService.create(userDto);
            this.setFreeCredit(user.id);
        }

        //if user exists and currently is blocked or the application is not current Application
        //then just reject it
        if (user.status.includes(UserStatus.BLOCKED) ||
            !user.applications.includes(Application.zarin))
            throw new HttpException({ message: 'User Blocked or Application incorrect', code: '423' }, 423);
        //create the payload
        const payload: PayloadDto = {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            phone: user.phone,
            roles: user.roles,
            application: user.applications,
            other: user.other
        };
        //generate the access and random access token
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(32).toString('hex');
        //store token for refreshing mechanism
        await this.storeToken(user.id, accessToken, refreshToken);
        //reeturn the result dtos as refresh and access tokens
        return {
            //bug number 5 to return user in all cases
            accessToken, refreshToken, user
            //accessToken, refreshToken, user: isNew ? null : user
        };
    }

    async refreshToken(dto: RefreshTokenDto) {

        try {
            const { accessToken, refreshToken } = dto;
            //decode the token, if is not valid throw error and reject
            const payload: any = await this.jwtService.decode(accessToken);
            //get the current stored token to compare
            const currentToken = await this.tokenRepository.findByUserId(payload.id);
            //if this is not the last token then reject
            if (currentToken == undefined || currentToken.accessToken !== accessToken ||
                currentToken.refreshToken !== refreshToken)
                throw new UnauthorizedException({ message: 'Token Expired', code: '401' });
            //create payload based on the previous one
            const newPayload: PayloadDto = {
                id: payload.id,
                displayName: payload.displayName,
                email: payload.email,
                phone: payload.phone,
                roles: payload.roles,
                application: payload.applications,
                other: payload.other
            };

            //generate the new access and refresh tokens
            currentToken.accessToken = this.jwtService.sign(newPayload);
            currentToken.refreshToken = crypto.randomBytes(32).toString('hex');

            //save the tokens to specify thee last tokens
            await this.tokenRepository.save(currentToken);
            //return the new tokens
            return {
                accessToken: currentToken.accessToken,
                refreshToken: currentToken.refreshToken
            };

        } catch (error) {
            throw new UnauthorizedException({ message: 'unauthorized', code: '102' });
        }
    }

    async reject(userId: string) {

        await this.tokenRepository.delete({ userId: userId });

        throw new HttpException({ message: 'No Content', code: '204' }, 204);
    }

    async phoneVerification(dto: PhoneVerificationDto): Promise<VerificationCodeResponseDto> {

        const { phone } = dto;

        let currentCode = await this.codeRepository.findByPhone(phone);

        let random = '';
        if (currentCode != undefined)
            random = currentCode.code;
        else {
            random = Math.floor(1000 + Math.random() * 9000).toString();

            const entity = new VerificationCodeEntity();
            entity.phone = phone;
            entity.code = random;

            currentCode = await this.codeRepository.save(entity);
        }

        this.notifService.sendTextMessage({ phone, content: random });

        const result: VerificationCodeResponseDto = {
            validUntil: currentCode.validUntilDate
        }
        return result;
    }

    async storeToken(userId: string, token: string, refresh: string) {
        let currentToken = await this.tokenRepository.findByUserId(userId);

        if (currentToken == undefined) {
            currentToken = new TokenEntity();
        }
        currentToken.userId = userId;
        currentToken.accessToken = token;
        currentToken.refreshToken = refresh;

        await this.tokenRepository.save(currentToken);
    }


    async loginAdmin(email: string, pass: string) {
        const entity = await this.userService.getByEmail(email);
        if (entity == undefined) {
            throw new UnauthorizedException({ message: 'Email not found', code: '104' });
        }
        const tempHash: string = crypto.pbkdf2Sync(pass, entity.salt, 1000, 64, `sha512`).toString(`hex`);
        if (tempHash != entity.password)
            throw new UnauthorizedException({ message: 'password is wrong', code: '103' });

        if (entity.status.includes(UserStatus.BLOCKED) ||
            !entity.applications.includes(Application.zarin))
            throw new HttpException({ message: 'User Blocked or Application incorrect', code: '423' }, 423);
        //create the payload
        const payload: PayloadDto = {
            id: entity.id,
            displayName: entity.displayName,
            email: entity.email,
            phone: entity.phone,
            roles: entity.roles,
            application: entity.applications,
            other: entity.other
        };
        //generate the access and random access token
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(32).toString('hex');
        //store token for refreshing mechanism
        await this.storeToken(entity.id, accessToken, refreshToken);
        //reeturn the result dtos as refresh and access tokens
        return {
            accessToken, refreshToken, user: null
        };
    }

    async guestAccessToken(dto: LoginGuestDto) {
        const { id } = dto;
        let isNew = false;

        //check if the user by this phone already exists or not?
        let user = await this.userService.getByGuestId(id);
        //if user does not exists, first create and store it
        if (user == undefined) {
            isNew = true;
            const userDto = new CreateGuestDto(id);
            user = await this.userService.createGuest(userDto);
        }
        //if user exists and currently is blocked or the application is not current Application
        //then just reject it
        if (user.status.includes(UserStatus.BLOCKED) ||
            !user.applications.includes(Application.zarin))
            throw new HttpException({ message: 'User Blocked or Application incorrect', code: '423' }, 423);
        //create the payload
        const payload: PayloadDto = {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            phone: user.phone,
            roles: user.roles,
            application: user.applications,
            other: user.other
        };
        //generate the access and random access token
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(32).toString('hex');
        //store token for refreshing mechanism
        await this.storeToken(user.id, accessToken, refreshToken);
        //reeturn the result dtos as refresh and access tokens
        return {
            accessToken, refreshToken, user
        };
    }

    private async setFreeCredit(userId: string) {
        const gift = await this.acTypeService.getGift();
        if (gift == undefined)
            return;
        await this.creditService.addCredit({ token: '', voucher: '', accountTypeCode: gift.code }, userId);
    }
}
