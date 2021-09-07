import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Response, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express'

import { RequestDiscountDto } from './dtos/request-discount.dto';
import { ResponceDiscountDto } from './dtos/responce-discount.dto';
import { ShopService } from './shop.service';

@ApiBearerAuth()
@ApiTags('shop')
// @UseGuards(AuthGuard('jwt'))
@Controller('shop')
export class ShopController {

    constructor(
        private readonly service: ShopService
    ) { }

    @ApiOperation({
        summary: 'Using discount for specific product',
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @Post("/discount")
    @UsePipes(ValidationPipe)
    async useDiscount(
        @Body() dto: RequestDiscountDto,
        @Response() res: ExpressResponse
    ): Promise<any> {
        this.service.useDiscountForInvoice(dto)
            .then( data => {
                return res.status(HttpStatus.OK)
                .json({
                    canUse: true
                })
            })
            .catch( err => {
                return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    canUse: false
                })
            })
    }

}
