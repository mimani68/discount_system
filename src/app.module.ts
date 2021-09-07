import { Module                 } from '@nestjs/common';
import { TypeOrmModule          } from '@nestjs/typeorm';
import { ConfigModule           } from '@nestjs/config';

import { AppService         } from 'src/app.service';
import { AppController      } from 'src/app.controller';
import { AuthenticateModule } from 'src/authenticate/authenticate.module';
import { ShopModule         } from 'src/shop/shop.module';
import { UserModule         } from 'src/user/user.module';
import { UserEntity         } from 'src/user/entities/user.entity';
import { ProductEntity      } from 'src/shop/entities/product.entity';
import { DiscountEntity     } from 'src/shop/entities/discount.entity';

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
      entities: [ UserEntity, ProductEntity, DiscountEntity ],
      synchronize: true,
    }),
    AuthenticateModule,
    ShopModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
