import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiGoneResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('alive')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'test the aliveness of the service',
    description: 'test the aliveness of the service'
  })
  @ApiOkResponse({ description: 'Pong' })
  @Get('/ping')
  getPing(): string {
    return this.appService.ping();
  }

  @ApiOperation({
    summary: 'test the readiness of database',
    description: 'test the readiness of database'
  })
  @ApiOkResponse({})
  @ApiGoneResponse({ description: 'database is not in ready state' })
  @Get('/readiness')
  getDBStatus() {
    return this.appService.aliveness();
  }
}