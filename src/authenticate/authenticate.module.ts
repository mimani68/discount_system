import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { NotificationModule } from 'src/notification/notification.module';
import { VerificationCodeRepository } from './repositories/verificationcode.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './repositories/token.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserCreditModule } from 'src/subscription/user-credit/user-credit.module';
import { UserCreditService } from 'src/subscription/user-credit/user-credit.service';
import { UserCreditEntity } from 'src/subscription/entities/user-credit.entity';
import { VoucherUsageEntity } from 'src/subscription/entities/voucher-usage.entity';
import { VoucherService } from 'src/subscription/voucher/voucher.service';
import { VoucherEntity } from 'src/subscription/entities/voucher.entity';
import { AccountTypeService } from 'src/subscription/account-type/account-type.service';
import { AccountTypeEntity } from 'src/subscription/entities/accounttype.entity';


@Module({
  imports: [UserCreditModule,
    TypeOrmModule.forFeature([VerificationCodeRepository, TokenRepository,
      UserCreditEntity, VoucherUsageEntity, VoucherEntity, AccountTypeEntity]),
    NotificationModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: '76fc673b7bf2c432f8ef813bd970c5f45b1515fca0d805d8d5b045435ad1f9e1',
      signOptions: {
        expiresIn: '40w'
      }
    })],
  providers: [AuthenticateService, JwtStrategy, UserCreditService, VoucherService, AccountTypeService],
  controllers: [AuthenticateController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthenticateModule { }
