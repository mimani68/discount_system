import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestDiscountDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    title: string;

}