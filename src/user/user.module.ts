import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { ShopController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([
    UserEntity,
  ])],
  controllers: [
    ShopController,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,,
  ]
})
export class UserModule { }