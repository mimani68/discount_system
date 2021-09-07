import { Controller, Post, Body, UsePipes, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiCreatedResponse, ApiUnauthorizedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';

import { AuthenticateService } from './authenticate.service';
import { LoginUserDto } from './dtos/loginuser.dto';
import { PhoneVerificationDto } from './dtos/phoneverification.dto';
import { RefreshTokenDto } from './dtos/refreshtoken.dto';
import { VerificationCodeResponseDto } from './dtos/verificationcorereesponse.dto';
import { AdminLoginDto } from './entities/admin-login.dto';

@ApiTags('authenticate')
@Controller('auth')
export class AuthenticateController {

    constructor(private authService: AuthenticateService) { }

    @ApiOperation({
        summary: 'get thee access and refresh token after sms sent and entered by user',
        description: 'get thee access and refresh token after sms sent and entered by user'
    })
    @ApiCreatedResponse({ type: RefreshTokenDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized or Timeout' })
    @ApiResponse({ description: 'User Blocked or Application incorrect', status: 423 })
    @Post('/accesstoken')
    @UsePipes(ValidationPipe)
    async accessToken(@Body() dto: LoginUserDto) {
        return this.authService.accessToken(dto);
    }

    @ApiOperation({
        summary: 'refresh token after its expiration',
        description: 'refresh token after its expiration'
    })
    @ApiCreatedResponse({ type: RefreshTokenDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiResponse({ description: 'Token expired', status: 401 })
    @Post('/refreshtoken')
    @UsePipes(ValidationPipe)
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @ApiOperation({
        summary: 'reject token, after that it is not valid anymore',
        description: 'reject token, after that it is not valid anymore'
    })
    @ApiBearerAuth()
    @ApiNoContentResponse({ description: 'No Content' })
    @Get('/reject')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async reject(@Req() req) {
        return this.authService.reject(req.user.id);
    }

    @ApiOperation({
        summary: 'try to send the sms to specified phone number',
        description: 'try to send the sms to specified phone number'
    })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiResponse({ type: VerificationCodeResponseDto, status: 200 })
    @Post('/verification')
    @UsePipes(ValidationPipe)
    async verifyPhone(@Body() dto: PhoneVerificationDto) {
        return this.authService.phoneVerification(dto);
    }

    @ApiOperation({
        summary: 'admin login via email and password',
        description: 'admin login via email and password'
    })
    @ApiCreatedResponse({ type: RefreshTokenDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized or Timeout' })
    @ApiResponse({ description: 'User Blocked or Application incorrect', status: 423 })
    @Post('/admin/login')
    @UsePipes(ValidationPipe)
    async loginAdmin(@Body() dto: AdminLoginDto) {
        return this.authService.loginAdmin(dto.email, dto.password);
    }
}
