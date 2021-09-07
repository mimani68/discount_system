import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FindUserByPhone {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'not Null d(-_-)b ' })
    phone: string;
}