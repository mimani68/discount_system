import { Entity, Column, CreateDateColumn } from "typeorm";
import { BaseEntity } from '../../users/entities/base.entity';


@Entity({ name: 'zarin.verification_codes' })
export class VerificationCodeEntity extends BaseEntity {

    constructor() {
        super();
    }

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    code: string;

    @CreateDateColumn({ type: 'timestamp', name:'valid_until_date', default: () => `now() + (2 ||' minutes')::interval` })
    validUntilDate: Date;
}