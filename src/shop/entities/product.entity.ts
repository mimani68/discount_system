import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from './base.entity';
// import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: 'zarin.product' })
export class ProductEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    id: string;

    @ApiProperty()
    @Column({ type: 'string', nullable: true })
    title: string;

    // @ManyToOne(type => UserEntity, user => user.likes, { eager: true })
    // @JoinColumn({ name: "userId" })
    // user: UserEntity;

}