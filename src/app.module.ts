import { Module                 } from '@nestjs/common';
import { TypeOrmModule          } from '@nestjs/typeorm';
import { ConfigModule           } from '@nestjs/config';

import { AppService                   } from './app.service';
import { AppController                } from './app.controller';
import { AuthenticateModule           } from './authenticate/authenticate.module';
import { ShopModule                   } from './shop/shop.module';
import { UsersModule                  } from './users/users.module';
import { BaseEntity as AuthBaseEntity } from './authenticate/entities/base.entity';
import { TokenEntity                  } from './authenticate/entities/token.entity';
import { VerificationCodeEntity       } from './authenticate/entities/verificationcode.entity';
import { BaseEntity as UserBaseEntity } from './users/entities/base.entity';
import { UserEntity                   } from './users/entities/user.entity';
import { BaseEntity as ShopBaseEntity } from './shop/entities/base.entity';
import { ProductEntity                } from './shop/entities/product.entity';
import { CategoryEntity               } from './shop/entities/category.entity';
import { DiscountEntity               } from './shop/entities/discount.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type     : 'postgres',
      host     : process.env.ZARIN_SERVICE_HOST     || 'none',
      port     : +process.env.ZARIN_SERVICE_PORT    || 12,
      username : process.env.ZARIN_SERVICE_USERNAME || 'none',
      password : process.env.ZARIN_SERVICE_PASSWORD || 'none',
      database : process.env.ZARIN_SERVICE_DBNAME,
      entities: [ 
        TokenEntity, AuthBaseEntity, VerificationCodeEntity,
        UserEntity, UserBaseEntity,
        ShopBaseEntity, ProductEntity, DiscountEntity, CategoryEntity
      ],
      synchronize: true,
    }),
    AuthenticateModule,
    ShopModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
