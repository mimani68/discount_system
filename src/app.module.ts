import { Module                 } from '@nestjs/common';
import { TypeOrmModule          } from '@nestjs/typeorm';
import { ConfigModule           } from '@nestjs/config';

import { AppService                   } from 'src/app.service';
import { AppController                } from 'src/app.controller';
import { AuthenticateModule           } from 'src/authenticate/authenticate.module';
import { ShopModule                   } from 'src/shop/shop.module';
import { UsersModule                  } from 'src/users/users.module';
import { BaseEntity as AuthBaseEntity } from 'src/authenticate/entities/base.entity';
import { TokenEntity                  } from 'src/authenticate/entities/token.entity';
import { VerificationCodeEntity       } from 'src/authenticate/entities/verificationcode.entity';
import { BaseEntity as UserBaseEntity } from 'src/users/entities/base.entity';
import { UserEntity                   } from 'src/users/entities/user.entity';
import { BaseEntity as ShopBaseEntity } from 'src/shop/entities/base.entity';
import { ProductEntity                } from 'src/shop/entities/product.entity';
import { CategoryEntity               } from 'src/shop/entities/category.entity';
import { DiscountEntity               } from 'src/shop/entities/discount.entity';

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
