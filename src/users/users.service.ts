import { Injectable, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import * as crypto from 'crypto';

import appConfig from 'src/config/application';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dtos/createuser.dto'
import { UserEntity, UserRole, UserStatus } from './entities/user.entity';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { UpdateFcmTokenDto } from './dtos/update-fcm-token.dto';
import { FindUserByPhone } from './dtos/find-user -by-phone.dto';

@Injectable()
export class UsersService {
    constructor(private readonly repository: UserRepository) { }

    async create(dto: CreateUserDto): Promise<UserEntity> {

        const currentuser = await this.repository.findByPhone(dto.phone);
        if (currentuser != undefined)
            throw new ConflictException({ message: 'Already Exists', code: '409' });

        const { phone } = dto;

        const entity = new UserEntity();
        entity.phone = phone;
        entity.applications = [appConfig.zarin.title];
        entity.roles = [UserRole.USER];
        entity.status = UserStatus.VERIFIED;

        return await this.repository.save(entity);
    }

    async update(dto: UpdateUserDto): Promise<UserEntity> {

        const currentUser = await this.repository.findOne({ id: dto.id });
        if (currentUser == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });

        const { email, displayName, other, fcmToken, password } = dto;

        currentUser.email = email;
        currentUser.displayName = displayName;
        currentUser.other = other;
        // currentUser.fcmToken = fcmToken;
        if (password != undefined && password.length > 0) {
            currentUser.salt = crypto.randomBytes(16).toString('hex');
            currentUser.password = crypto.pbkdf2Sync(password,
                currentUser.salt, 1000, 64, `sha512`).toString(`hex`);
        }

        return await this.repository.save(currentUser);
    }

    async updateFcmToken(dto: UpdateFcmTokenDto, userId: string): Promise<UserEntity> {

        const currentUser = await this.repository.findOne({ id: userId });
        if (currentUser == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });

        const { fcmToken } = dto;
        // currentUser.fcmToken = fcmToken;

        return await this.repository.save(currentUser);
    }

    async delete(id: string): Promise<any> {

        const currentUser = await this.repository.findOne({ id });
        if (currentUser == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });
        return await this.repository.delete(id);
    }

    async getAll({ limit = 10, offset = 0, search = "" }: { limit: number, offset: number, search: string }): Promise<UserEntity[]> {

        if (search != "")
            return await this.repository.getAllUsersBySearch({ limit, offset, search });
        return await this.repository.getAllUsers({ limit, offset });
    }

    async getById(id: string) {

        const result = await this.repository.getUserById(id);
        if (result == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });
        return result;
    }

    async getByEmail(email: string) {
        return await this.repository.findOne({ email });
    }

    async getByPhone(phone: string) {

        return await this.repository.findByPhone(phone);
    }

    async blockUser(id: string) {

        const user = await this.repository.getUserById(id);
        if (user == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });

        user.status = UserStatus.BLOCKED;
        return await this.repository.save(user);
    }

    async unblockUser(id: string) {

        const user = await this.repository.getUserById(id);
        if (user == undefined)
            throw new NotFoundException({ message: 'not found', code: HttpStatus.NOT_FOUND.toString() });

        user.status = UserStatus.VERIFIED;
        return await this.repository.save(user);
    }

    async isGuestUser(user) {
        return user.roles.find( el => el === UserRole.GUEST ) === UserRole.GUEST
    }
    
    async findByPhonenumber(dto:FindUserByPhone): Promise<UserEntity>{
        const {phone} = dto
        const user = await this.repository.findOne(phone)
        if (user == undefined){
            throw new NotFoundException({ message: 'there is no user with this phone number', code: HttpStatus.NOT_FOUND.toString() });
        }
        return user
    }
}
