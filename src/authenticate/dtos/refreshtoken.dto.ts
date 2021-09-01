import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {

    @ApiProperty({required:true, description: 'access token'})
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    accessToken: string;

    @ApiProperty({required:true, description: 'refresh token'})
    @IsNotEmpty({ message: 'Is empty' })
    @IsString({ message: 'Wrong format. must be string' })
    refreshToken:string;

    @ApiProperty()
    user: object;
}