import { EntityRepository, Repository, getRepository } from "typeorm";
import {VerificationCodeEntity} from '../entities/verificationcode.entity';


@EntityRepository(VerificationCodeEntity)
export class VerificationCodeRepository extends Repository<VerificationCodeEntity> {

    findByPhone(phone: string): Promise<VerificationCodeEntity> {
        
        return getRepository(VerificationCodeEntity)
            .createQueryBuilder('ver')
            .where(`ver.phone = :phone and ver.valid_until_date > now()`, {phone})
            .orderBy({ 'ver.valid_until_date': 'DESC' })
            .getOne();
    }

    findByPhoneAndCode(phone: string, code: string): Promise<VerificationCodeEntity> {

        return getRepository(VerificationCodeEntity)
            .createQueryBuilder('ver')
            .where(`ver.phone = :phone and ver.code= :code and ver.valid_until_date > now()`, {phone, code})
            .orderBy({ 'ver.valid_until_date': 'DESC' })
            .getOne();
    }

}