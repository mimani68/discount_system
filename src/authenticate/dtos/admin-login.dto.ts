import { ApiProperty } from "@nestjs/swagger";

export class AdminLoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}