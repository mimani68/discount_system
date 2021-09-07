
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFcmTokenDto {
    @ApiProperty()
    fcmToken : string;
}