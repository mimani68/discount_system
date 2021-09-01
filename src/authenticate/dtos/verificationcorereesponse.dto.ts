import { ApiProperty } from "@nestjs/swagger";

export class VerificationCodeResponseDto{
    @ApiProperty({description: 'Date and time that the generated and sent token is valid'})
    validUntil: Date
}