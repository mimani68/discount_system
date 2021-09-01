import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShopEntity } from './entities/shop.entity';
import { CreateShopDto } from './dtos/create-shop.dto';

@Injectable()
export class ShopService {

    constructor(
        @InjectRepository(ShopEntity)
        private readonly repository: Repository < ShopEntity >,
    ) {}

    async create(dto: CreateShopDto) {
        return "salam";
        // const { title } = dto;
        // const entity = new ShopEntity();
        // entity.title = title;
        // return await this.repository.save(entity);
    }

}