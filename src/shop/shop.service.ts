import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { string, object } from 'joi';

import { DiscountEntity } from './entities/discount.entity';
import { RequestDiscountDto } from './dtos/request-discount.dto';

@Injectable()
export class ShopService {

    constructor(
        @InjectRepository(DiscountEntity)
        private readonly _discountRepository: Repository < DiscountEntity >,
    ) {}

    async useDiscountForInvoice(dto: RequestDiscountDto): Promise<boolean> {
        /*
        |
        | Validation
        |
        */
        const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        const schema = object({
            userId: string()
                .pattern(UUID_PATTERN)
                .min(3)
                .max(50)
                .required(),

            discountCode: string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),

            productId: string()
                .pattern(UUID_PATTERN)
                .min(3)
                .max(50)
                .required()
        })
        const { error, value } = schema.validate({
            userId:       dto.userId,
            discountCode: dto.discountCode,
            productId:    dto.productId
        });
        if ( error ) {
            console.log(error)
            return Promise.reject(false)
        }
        /*
        |
        | Query
        |
        */
        let result: Array<DiscountEntity> = await this._discountRepository.find({
            where: {
                product: dto.productId,
                code:    dto.discountCode,
                user:    dto.userId
            },
        }).then( a => {
            console.log(a)
            return a
        }).catch( err => {
            console.error(err)
            return null
        })
        if ( result.length > 0 ) {
            return Promise.resolve(true)
        } else {
            return Promise.reject(false)
        }
    }

}