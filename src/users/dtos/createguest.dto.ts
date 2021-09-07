import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGuestDto {

    constructor(id: string) {
        this.guestId = id;
    }

    @ApiProperty()
    @IsNotEmpty({ message: 'guest id must be provided' })
    guestId: string;
}