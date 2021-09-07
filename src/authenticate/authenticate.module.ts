import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../config/application';
import { JwtStrategy } from './jwt.strategy';
import { TokenRepository } from './repositories/token.repository';
import { VerificationCodeRepository } from './repositories/verificationcode.repository';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCodeRepository, TokenRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: appConfig.zarin.jwtSalt,
      signOptions: {
        expiresIn: appConfig.zarin.jwtLifeTime
      }
    })],
  providers: [AuthenticateService, JwtStrategy],
  controllers: [AuthenticateController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthenticateModule { }
