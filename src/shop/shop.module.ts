import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopTagController } from './tag/shop-tag.controller';
import { ShopTagService } from './tag/shop-tag.service';


@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([
    ShopEntity,
  ])],
  controllers: [
    ShopController,
    ShopTagController
  ],
  providers: [
    ShopService,
    ShopTagService,
  ],
  exports: [
    ShopService,,
    ShopTagService
  ]
})
export class ShopModule { }