import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from './base.entity';
import { CategoryEntity } from "./category.entity";
import { DiscountEntity } from "./discount.entity";

@Entity({ name: 'zarin.product' })
export class ProductEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    title: string;

    @ApiProperty()
    @Column({ type: 'json', nullable: true })
    attribute: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    sku: string;

    @ApiProperty()
    @Column({ type: "text", nullable: true })
    status: string;

    @ManyToOne(() => CategoryEntity, el => el.id, { eager: true })
    category: CategoryEntity;

    @OneToMany(() => DiscountEntity, el => el.product)
    discounts: DiscountEntity[];

}