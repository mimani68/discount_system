import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginGuestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'unique guest id must be provided' })
    id: string;
}