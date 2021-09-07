import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from './base.entity';
import { ApiProperty } from "@nestjs/swagger";
import { DiscountEntity } from "src/shop/entities/discount.entity";
// import { StoryLikeEntity } from "src/story/entities/storylike.entity";
// import { StoryRateEntity } from "src/story/entities/storyrate.entity";
// import { StoryCommentEntity } from "src/story/entities/storycomment.entity";
// import { VoucherEntity } from "src/subscription/entities/voucher.entity";
// import { ListenProgressEntity } from "src/listen-progress/entities/listen-progress.entity.dto";
// import { UserCreditEntity } from "src/subscription/entities/user-credit.entity";
// import { PostEntity, PostLikeEntity } from '../../campaign/entities';
// import { SubscriptionEntity } from "src/subscription/entities/subscription.entity";

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    CONSUMER = 'CONSUMER',
    GUEST = 'GUEST',
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    BLOCKED = 'BLOCKED'
}

@Entity({ name: 'zarin.users' })
export class UserEntity extends BaseEntity {

    constructor() {
        super();
    }

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    phone: string;

    @ApiProperty()
    @Column({ name: 'display_name', nullable: true })
    displayName: string;

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

    @ApiProperty()
    @Column({ nullable: true })
    password: string;

    @ApiProperty()
    @Column({ nullable: true, })
    salt: string;

    @ApiProperty()
    @Column({
        type: "text",
        array: true,
        enum: UserRole,
        nullable: true
    })
    roles: UserRole[];

    @ApiProperty()
    @Column({
        type: "text",
        array: true,
        nullable: true
    })
    applications: string[];

    @OneToMany(type => DiscountEntity, el => el.user)
    discounts: DiscountEntity[];

    @ApiProperty()
    @Column({
        type: "text",
        enum: UserStatus,
        nullable: true
    })
    status: UserStatus;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    other: object;

}