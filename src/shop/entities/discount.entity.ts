import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from '../../users/entities/base.entity';
import { ShopEntity } from "./shop.entity";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: 'zarin.discount' })
export class ShopBookmarkEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    userId: string;

    @ManyToOne(type => UserEntity, user => user.likes, { eager: true })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    shopId: string;

    @ManyToOne(type => ShopEntity, shop => shop.likes, { eager: true })
    @JoinColumn({ name: "shopId" })
    shop: ShopEntity;
}