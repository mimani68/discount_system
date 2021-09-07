import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from './entities/product.entity';
import { DiscountEntity } from './entities/discount.entity';
import { RequestDiscountDto } from './dtos/request-discount.dto';
import { ResponceDiscountDto } from './dtos/responce-discount.dto';

@Injectable()
export class ShopService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly _shopRepository: Repository < ProductEntity >,
        @InjectRepository(DiscountEntity)
        private readonly _discountRepository: Repository < DiscountEntity >,
    ) {}

    async useDiscountForInvoice(dto: RequestDiscountDto): Promise<ResponceDiscountDto> {
        let res = new ResponceDiscountDto();
        return Promise.resolve(res);
        // const { title } = dto;
        // const entity = new ShopEntity();
        // entity.title = title;
        // return await this.repository.save(entity);
    }

}