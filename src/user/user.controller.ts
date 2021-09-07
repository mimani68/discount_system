import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

    constructor(
        private readonly service: UserService
    ) { }

}
