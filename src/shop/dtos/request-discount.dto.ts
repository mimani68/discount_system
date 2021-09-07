import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestDiscountDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    userId: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    discountCode: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    productId: string;
}