import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column } from "typeorm";

import { BaseEntity } from './base.entity';

export enum UserState {
    UNACTIVATED = 1,
    ACTIVE = 2,
    DEACTIVE = 3,
}

@Entity({ name: 'zarin.discount' })
export class UserEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'uuid', nullable: false })
    id: string;

    @ApiProperty()
    @Column({ type: 'string', nullable: false })
    username: string;

    @ApiProperty()
    @Column({ type: 'string', nullable: true })
    password: string;

    @ApiProperty()
    @Column({ type: 'string', nullable: true })
    status: UserState;

}