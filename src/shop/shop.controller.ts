import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CreateShopDto } from './dtos/create-shop.dto';
import { ShopService } from './shop.service';

@ApiBearerAuth()
@ApiTags('shop')
@UseGuards(AuthGuard('jwt'))
@Controller('shop')
export class ShopController {

    constructor(
        private readonly service: ShopService
    ) { }

    @ApiOperation({
        summary: 'Using discount for specific invoice',
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @Post()
    @UsePipes(ValidationPipe)
    async useDiscount(@Body() dto: CreateShopDto) {
        return await this.service.useDiscountForInvoice(dto);
    }

}
