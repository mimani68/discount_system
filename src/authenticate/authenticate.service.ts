import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import appConfig from 'src/config/application';
import { PayloadDto } from './dtos/payload.dto';
import { UserStatus } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dtos/createuser.dto';
// import { LoginUserDto } from 'src/dtos/loginuser.dto';
// import { NotificationService } from 'src/notification/notification.service';
import { PhoneVerificationDto } from './dtos/phoneverification.dto';
import { VerificationCodeRepository } from './repositories/verificationcode.repository'
import { VerificationCodeEntity } from './entities/verificationcode.entity';
import { VerificationCodeResponseDto } from './dtos/verificationcorereesponse.dto';
import { TokenRepository } from './repositories/token.repository';
import { TokenEntity } from './entities/token.entity';
import { RefreshTokenDto } from './dtos/refreshtoken.dto';
// import { UserCreditService } from 'src/subscription/user-credit/user-credit.service';
// import { AccountTypeService } from 'src/subscription/account-type/account-type.service';


@Injectable()
export class AuthenticateService {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        // private notifService: NotificationService,
        private readonly verificationRepository: VerificationCodeRepository,
        private readonly tokenRepository: TokenRepository,
        // private readonly creditService: UserCreditService,
        // private readonly acTypeService: AccountTypeService
    ) { }


    /**
     * 
     * Generate jwt access token
     * 
     * @param dto {any}
     * @returns 
     */
    async accessToken(dto: any) {

        const { phone, code } = dto;
        let isNew = false;

        // find last valid code sent to the phone number
        const currentCode = await this.verificationRepository.findByPhoneAndCode(phone, code);

        // if the code does not exists or if is not valid then just reject
        if (currentCode == undefined || currentCode.code != code)
            throw new UnauthorizedException({ message: 'Unauthorized or Timeout', code: 101 });

        // if the code exists and it is valid, first of all delete it
        // await this.verificationRepository.delete({ id: currentCode['id'] });

        // check if the user by this phone already exists or not?

        let user = await this.userService.getByPhone(phone);

        // if user does not exists, first create and store it
        if (user == undefined) {
            isNew = true;
            const userDto = new CreateUserDto(phone);
            user = await this.userService.create(userDto);
            this.initialCharge(user.id);
        }

        // if user exists and currently is blocked or the application is not current Application
        // then just reject it
        if (user.status.includes(UserStatus.BLOCKED) ||
            !user.applications.includes(appConfig.zarin.title))
            throw new HttpException({ message: 'User Blocked or Application incorrect', code: '423' }, 423);
        
        // create the payload
        const payload: PayloadDto = {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            phone: user.phone,
            roles: user.roles,
            application: user.applications,
            other: user.other
        };

        // generate the access and random access token
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(32).toString('hex');

        // store token for refreshing mechanism
        await this.storeToken(user.id, accessToken, refreshToken);

        // reeturn the result dtos as refresh and access tokens
        return {
            // bug number 5 to return user in all cases
            accessToken, refreshToken, user
            // accessToken, refreshToken, user: isNew ? null : user
        };
    }

    /**
     * 
     * Generate Refresh token
     * 
     * @param dto 
     * @returns 
     */
    async refreshToken(dto: RefreshTokenDto) {

        try {
            const { accessToken, refreshToken } = dto;
            // decode the token, if is not valid throw error and reject
            const payload: any = await this.jwtService.decode(accessToken);
            // get the current stored token to compare
            const currentToken = await this.tokenRepository.findByUserId(payload.id);
            // if this is not the last token then reject
            if (currentToken == undefined || currentToken.accessToken !== accessToken ||
                currentToken.refreshToken !== refreshToken)
                throw new UnauthorizedException({ message: 'Token Expired', code: '401' });
            // create payload based on the previous one
            const newPayload: PayloadDto = {
                id: payload.id,
                displayName: payload.displayName,
                email: payload.email,
                phone: payload.phone,
                roles: payload.roles,
                application: payload.applications,
                other: payload.other
            };

            // generate the new access and refresh tokens
            currentToken.accessToken = this.jwtService.sign(newPayload);
            currentToken.refreshToken = crypto.randomBytes(32).toString('hex');

            // save the tokens to specify thee last tokens
            await this.tokenRepository.save(currentToken);

            // return the new tokens
            return {
                accessToken: currentToken.accessToken,
                refreshToken: currentToken.refreshToken
            };

        } catch (error) {
            throw new UnauthorizedException({ message: 'unauthorized', code: '102' });
        }
    }

    /**
     * 
     * Store jwt tokens history in db
     * 
     * @param userId 
     * @param token 
     * @param refresh 
     */
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

    /**
     * 
     * @param userId 
     * @private
     */
    async reject(userId: string) {

        await this.tokenRepository.delete({ userId: userId });
        throw new HttpException({ message: 'No Content', code: '204' }, 204);
    }


    /**
     * 
     * Verify user by sending sms
     * 
     * @param dto PhoneVerificationDto
     * @returns Promise<VerificationCodeResponseDto>
     */
    async phoneVerification(dto: PhoneVerificationDto): Promise<VerificationCodeResponseDto> {

        const { phone } = dto;

        // Retrive phone from user and check it
        let currentCode = await this.verificationRepository.findByPhone(phone);

        let random = '';
        if (currentCode != undefined)
            random = currentCode.code;
        else {

            // Generate random number less that 10k
            random = Math.floor(1000 + Math.random() * 9000).toString();

            // Create veritication and store it in db
            const entity = new VerificationCodeEntity();
            entity.phone = phone;
            entity.code = random;

            currentCode = await this.verificationRepository.save(entity);
        }

        // Send verification code ti user by sms
        // this.notifService.sendTextMessage({ phone, content: random });

        // Show the expireTime code to user
        const result: VerificationCodeResponseDto = {
            validUntil: currentCode.validUntilDate
        }

        return result;
    }

    /**
     * 
     * First gift for new users
     * 
     * @param userId 
     * @returns 
     */
    private async initialCharge(userId: string) {
        return true
        // const gift = await this.acTypeService.getGift();
        // if (gift == undefined)
        //     return;
        // await this.creditService.addCredit({ token: '', voucher: '', accountTypeCode: gift.code }, userId);
    }
}
