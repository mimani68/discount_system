import {PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp', name:'created_date', default: () => 'now()' })
    createDate: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamp', name:'modified_date', default: () => 'now()' })
    modifiedDate: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamp', name:'deleted_date', nullable: true})
    deletedDate: Date;
}