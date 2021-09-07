import { EntityRepository, Repository, getRepository } from "typeorm";
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    findByPhone(phone: string): Promise<UserEntity> {
        return this.findOne({ phone });
    }

    getAllUsers({ limit = 10, offset = 0 }:
        { limit: number, offset: number }): Promise<any> {

        return getRepository(UserEntity)
            .createQueryBuilder('users')
            .where(`roles @> ARRAY['USER']`)
            .orderBy({ 'users.created_date': 'ASC' })
            .limit(limit).offset(offset)
            .getMany();
    }

    getAllUsersBySearch({ limit = 10, offset = 0, search = '' }:
        { limit: number, offset: number, search: string }): Promise<any> {

        return getRepository(UserEntity)
            .createQueryBuilder('users')
            .where(`(users.display_name like '%${search}%' or 
            users.email like '%${search}%' or 
            users.phone like '%${search}%') 
            and roles @> ARRAY['USER']`)
            .orderBy({ 'users.created_date': 'ASC' })
            .limit(limit).offset(offset)
            .getMany();
    }

    getUserById(id: string) {
        return this.findOne({ id });
    }

}