import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from './base.entity';
import { UserEntity } from "src/users/entities/user.entity";

@Entity({ name: 'zarin.discount' })
export class DiscountEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    id: string;

    @ManyToOne(type => UserEntity, (user: UserEntity) => user.id, { eager: true })
    @JoinColumn({ name: "user" })
    user: UserEntity;

    // @ManyToOne(type => ShopEntity, shop => shop.likes, { eager: true })
    // @JoinColumn({ name: "shopId" })
    // shop: ShopEntity;
}