import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty()
    @IsUUID("4", { message: 'Wrong Id format' })
    @IsNotEmpty({ message: 'Required' })
    id: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Required' })
    displayName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsOptional()
    other: object;

    @ApiProperty()
    fcmToken : string;

    @ApiProperty()
    password: string;
}