import { Length, IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    constructor(phone: string) {
        this.phone = phone;
    }

    @ApiProperty()
    @IsNotEmpty({ message: 'Is empty' })
    @Length(12, 12, { message: 'Wrong length: 989121111111 correct format' })
    @IsString({ message: 'Wrong format. must be string' })
    @Matches(/^[9][8][0-9]{10}$/, { message: 'Wrong international phone number format' })
    phone: string;
}