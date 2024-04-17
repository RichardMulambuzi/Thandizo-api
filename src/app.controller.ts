import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Thandizo API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'get response from main' })
  @ApiResponse({ status: 200, description: ' return main ' })
  getHello(): string {
    return this.appService.getHello();
  }
}
