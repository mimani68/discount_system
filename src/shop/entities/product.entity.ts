import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from './base.entity';
import { CategoryEntity } from "./category.entity";

@Entity({ name: 'zarin.product' })
export class ProductEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'uuid', nullable: true })
    id: string;

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

    @ManyToOne(type => CategoryEntity, user => user.user, { eager: true })
    // @JoinColumn({ name: "userId" })
    category: CategoryEntity;

}