import {
    Controller, Body, Post, UsePipes, ValidationPipe, Put, Param, Delete,
    ParseUUIDPipe, Get, Query, Patch, UseGuards, Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse,
    ApiUnauthorizedResponse, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiParam, ApiBearerAuth
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UpdateFcmTokenDto } from './dtos/update-fcm-token.dto';
import { FindUserByPhone } from './dtos/find-user -by-phone.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(('jwt')))
export class UsersController {

    constructor(private service: UsersService) { }

    @ApiOperation({
        summary: 'create a new user',
        description: 'create a new user'
    })
    @ApiCreatedResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() dto: CreateUserDto) {
        return await this.service.create(dto);
    }

    @ApiOperation({
        summary: 'update existing user',
        description: 'update existing user'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @Put()
    @UsePipes(ValidationPipe)
    async updateUser(@Body() dto: UpdateUserDto) {
        return await this.service.update(dto);
    }


    @ApiOperation({
        summary: 'update fcm token of user',
        description: 'update fcm token of user'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @Put('/fcm')
    @UsePipes(ValidationPipe)
    async updateUserFcmToken(@Body() dto: UpdateFcmTokenDto, @Req() request) {
        return await this.service.updateFcmToken(dto, request.user.id);
    }

    @ApiOperation({
        summary: 'delete existing user',
        description: 'delete existing user'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @Delete('/:id')
    async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
        return await this.service.delete(id);
    }

    @ApiOperation({
        summary: 'get all users',
        description: 'get all users'
    })
    @ApiOkResponse({ type: [UserEntity] })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiQuery({ name: 'limit', type: 'number', required: false })
    @ApiQuery({ name: 'offset', type: 'number', required: false })
    @ApiQuery({ name: 'q', type: 'string', required: false })
    @Get()
    async getAllUsers(@Query('limit') limit, @Query('offset') offset, @Query('q') search) {
        limit = limit || 10;
        offset = offset || 0;

        return await this.service.getAll({ limit, offset, search });
    }

    @ApiOperation({
        summary: 'get existing user by id',
        description: 'get existing user by id'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', type: 'string' })
    @Get('/:id')
    async getUserById(@Param('id', new ParseUUIDPipe()) id) {
        return await this.service.getById(id);
    }

    @ApiOperation({
        summary: 'block user',
        description: 'block user'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', type: 'string' })
    @Patch('/:id/block')
    async blockUser(@Param('id', new ParseUUIDPipe()) id) {
        return await this.service.blockUser(id);
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'unblock user',
        description: 'unblock user'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', type: 'string' })
    @Patch('/:id/unblock')
    async unblockUser(@Param('id', new ParseUUIDPipe()) id) {
        return await this.service.unblockUser(id);
    }
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'get user by phone number',
        description: 'get user by phome number'
    })
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @Get('/user-phone/find')
    async getUserByPhoneNumber(dto:FindUserByPhone) {
        return await this.service.findByPhonenumber(dto);
    }
}
