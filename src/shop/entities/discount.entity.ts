import { Entity, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from './base.entity';
import { UserEntity } from "src/users/entities/user.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'zarin.discount' })
export class DiscountEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ManyToOne(type => UserEntity, (user: UserEntity) => user.id, { eager: true })
    @JoinColumn({ name: "user" })
    user: UserEntity;

    @ManyToOne(type => ProductEntity, el => el.id, { eager: true })
    product: ProductEntity;
}