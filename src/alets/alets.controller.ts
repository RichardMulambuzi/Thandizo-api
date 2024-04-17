import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Alert } from './alets.model';
import { AlertService } from './alet.service';
import { CreateAlertDto } from './dto/alets.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new alert' })
  @ApiResponse({ status: 201, description: 'Alert created', type: Alert })
  @ApiResponse({ status: 500, description: 'Failed to create alert' })
  async create(@Body() createAlertDto: CreateAlertDto): Promise<Alert> {
    try {
      return await this.alertService.create(createAlertDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create alert',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @ApiResponse({ status: 200, description: 'Return all alerts', type: [Alert] })
  async findAll(): Promise<Alert[]> {
    return this.alertService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an alert by ID' })
  @ApiResponse({ status: 200, description: 'Alert found', type: Alert })
  @ApiResponse({ status: 404, description: 'Alert not found' })
  async findOne(@Param('id') id: number): Promise<Alert> {
    const alert = await this.alertService.findOne(id);
    if (!alert) {
      throw new HttpException('Alert not found', HttpStatus.NOT_FOUND);
    }
    return alert;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an alert by ID' })
  @ApiResponse({ status: 200, description: 'Alert updated', type: Alert })
  @ApiResponse({ status: 404, description: 'Alert not found' })
  @ApiResponse({ status: 500, description: 'Failed to update alert' })
  async update(
    @Param('id') id: number,
    @Body() updateAlertDto: CreateAlertDto,
  ): Promise<Alert> {
    try {
      return await this.alertService.update(id, updateAlertDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update alert',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-alet/:id')
  @ApiOperation({ summary: 'Delete remove alet' })
  @ApiResponse({ status: 200, description: 'alet deleted successfully' })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can delete staff
  async deleteAletById(@Param('id') id: number) {
    return this.alertService.deletAaletById(id);
  }
}
