import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from './base.entity';
import { ProductEntity } from "./product.entity";

@Entity({ name: 'zarin.categories' })
export class CategoryEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    title: string;

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    parent: string;

    @OneToMany(() => ProductEntity, el => el.category)
    @JoinColumn({ name: "products" })
    products: ProductEntity[];

}