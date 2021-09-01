import { Entity, Column } from "typeorm";
import { BaseEntity } from '../../users/entities/base.entity';


@Entity({ name: 'zarin.tokens' })
export class TokenEntity extends BaseEntity {

    constructor() {
        super();
    }

    @Column({ type: 'text', nullable: true })
    userId: string;

    @Column({ name: 'acceess_token', type: 'text', nullable: true })
    accessToken: string;

    @Column({ name: 'reefresh_token', type: 'text', nullable: true })
    refreshToken: string;
}