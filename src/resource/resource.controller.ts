import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './create.resource.dto';
import { UpdateResourceDto } from './update.resource.dto';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('resources')
@ApiTags('relief')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, description: 'List of resources retrieved' })
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource found' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({ status: 201, description: 'Resource created' })
  create(@Body() resourceData: CreateResourceDto) {
    return this.resourceService.create(resourceData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource updated' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  update(@Param('id') id: string, @Body() resourceData: UpdateResourceDto) {
    return this.resourceService.update(Number(id), resourceData);
  }

  @Delete(':id/:quantityToRemove')
  @ApiOperation({ summary: 'Remove a resource and send alert message' })
  @ApiResponse({
    status: 200,
    description: 'Resource removed and alert message sent',
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  remove(
    @Param('id') id: string,
    @Param('quantityToRemove') quantityToRemove: string,
  ) {
    return this.resourceService.remove(Number(id), Number(quantityToRemove));
  }
}
