import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountEntity } from './entities/discount.entity';
import { ProductEntity } from './entities/product.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([
    ProductEntity,
    DiscountEntity
  ])],
  controllers: [
    ShopController,
  ],
  providers: [
    ShopService,
  ],
  exports: [
    ShopService,
  ]
})
export class ShopModule { }