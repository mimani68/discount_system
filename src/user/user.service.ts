import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository < any >,
    ) {}

    async getByPhone(phone: string): Promise<UserEntity> {
        let user = new UserEntity()
        user.id = '12'
        user.username = "mahdi"
        return Promise.resolve(user)
    }

}