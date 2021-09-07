import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";

import { BaseEntity } from './base.entity';
import { UserEntity } from "src/users/entities/user.entity";
import { ProductEntity } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'zarin.discounts' })
export class DiscountEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true, default: () => 'now()'})
    start: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true, default: null })
    end: Date;

    @ManyToOne(type => UserEntity, el => el.discounts)
    @JoinColumn({ name: "user" })
    user: UserEntity;

    @ManyToOne(type => ProductEntity, el => el.discounts)
    @JoinColumn({ name: "product" })
    product: ProductEntity;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true, default: null })
    usedAt: Date;

    @ApiProperty()
    @Column({ type: 'varchar', length: 100, nullable: true })
    status: string;
}
