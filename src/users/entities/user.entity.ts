import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from './base.entity';
import { ApiProperty } from "@nestjs/swagger";
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

    // @OneToMany(type => StoryLikeEntity, like => like.user)
    // likes: StoryLikeEntity[];

    // @OneToMany(type => StoryRateEntity, rate => rate.user)
    // rates: StoryRateEntity[];

    // @OneToMany(type => StoryCommentEntity, comment => comment.user)
    // comments: StoryCommentEntity[];

    // @OneToMany(type => VoucherEntity, sub => sub.user)
    // vouchers: VoucherEntity[];

    // @OneToMany(type => ListenProgressEntity, p => p.user)
    // listenProgresses: ListenProgressEntity[];

    // @OneToMany(type => UserCreditEntity, credit => credit.user)
    // credits: UserCreditEntity[];

    // @OneToMany(type => PostEntity, o => o.author)
    // posts: PostEntity[];

    // @OneToMany(type => PostLikeEntity, e => e.user)
    // postLikes: PostLikeEntity[];

    // @Column({ name: 'fcm_token', type: 'text', nullable: true })
    // fcmToken: string;

    // @OneToMany(type => UserCreditEntity, subscription => subscription.user, {nullable:true})
    // subscriptions: SubscriptionEntity[];
}