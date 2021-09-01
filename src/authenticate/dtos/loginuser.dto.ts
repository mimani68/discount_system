import { IsNotEmpty, Length, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

    @ApiProperty({ required: true, description: 'the phone number in international format, like 989121111111' })
    @IsNotEmpty({ message: 'Is empty' })
    @Length(12, 12, { message: 'Wrong length: 989121111111 correct format' })
    @IsString({ message: 'Wrong format. must be string' })
    @Matches(/^[9][8][0-9]{10}$/, { message: 'Wrong international phone number format' })
    phone: string;

    @ApiProperty({ required: true, description: 'the 4 digits length number sent to the specified phone number' })
    @IsNotEmpty({ message: 'Is empty' })
    @Length(4, 4, { message: 'Wrong length: 1111 correct format' })
    @IsString({ message: 'Wrong format. must be string' })
    @Matches(/^[0-9]{4}$/, { message: 'Wrong verification code format' })
    code: string;
}