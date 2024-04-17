import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PopulationData } from './population.model';
import { PopulationDataService } from './population.service';
import { AddPopulationDataDto } from './dte';

@ApiTags('Population Data')
@Controller('population')
export class PopulationDataController {
  constructor(private readonly populationService: PopulationDataService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new population data record' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new population data record',
  })
  async create(
    @Body() populationData: AddPopulationDataDto,
  ): Promise<PopulationData> {
    const newPopulationData =
      await this.populationService.create(populationData);
    return newPopulationData;
  }
  @Get()
  @ApiOperation({ summary: 'Retrieve all population data records' })
  @ApiResponse({ status: 200, description: 'Success', type: [PopulationData] })
  async getAllPopulationData(): Promise<PopulationData[]> {
    return this.populationService.findAll();
  }

  @Get(':taName/:areaName')
  @ApiOperation({
    summary: 'Retrieve population data for a specific area within a TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: [PopulationData] })
  async getPopulationForAreaInTA(
    @Param('taName') taName: string,
    @Param('areaName') areaName: string,
  ): Promise<PopulationData[]> {
    return this.populationService.findPopulationForAreaInTA(taName, areaName);
  }

  @Get(':taName/:areaName/totalHouseholds')
  @ApiOperation({
    summary:
      'Get the total number of households for a specific area within a TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalHouseholdsForAreaInTA(
    @Param('taName') taName: string,
    @Param('areaName') areaName: string,
  ): Promise<number> {
    return this.populationService.getTotalHouseholdsForAreaInTA(
      taName,
      areaName,
    );
  }

  @Get(':taName/totalHouseholds')
  @ApiOperation({
    summary: 'Get the total number of households for the entire TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalHouseholdsForTA(
    @Param('taName') taName: string,
  ): Promise<number> {
    return this.populationService.getTotalHouseholdsForTA(taName);
  }

  @Get(':taName')
  @ApiOperation({ summary: 'Retrieve population data for the entire TA' })
  @ApiResponse({ status: 200, description: 'Success', type: [PopulationData] })
  async getPopulationForTA(
    @Param('taName') taName: string,
  ): Promise<PopulationData[]> {
    return this.populationService.findPopulationForTA(taName);
  }

  @Get(':taName/totalHouseholds')
  @ApiOperation({
    summary: 'Get the total number of households for the entire TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getHouseholdsForTA(@Param('taName') taName: string): Promise<number> {
    return this.populationService.getHouseholdsForTA(taName);
  }

  @Get(':taName/:areaName/totalHouseholds')
  @ApiOperation({
    summary:
      'Get the total number of households for a specific area within a TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getHouseholdsForAreaInTA(
    @Param('taName') taName: string,
    @Param('areaName') areaName: string,
  ): Promise<number> {
    return this.populationService.getHouseholdsForAreaInTA(taName, areaName);
  }

  @Get(':taName/totalMales')
  @ApiOperation({ summary: 'Get the total number of males for the entire TA' })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalMalesForTA(@Param('taName') taName: string): Promise<number> {
    return this.populationService.getTotalMalesForTA(taName);
  }

  @Get(':taName/totalFemales')
  @ApiOperation({
    summary: 'Get the total number of females for the entire TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalFemalesForTA(@Param('taName') taName: string): Promise<number> {
    return this.populationService.getTotalFemalesForTA(taName);
  }

  @Get(':taName/:areaName/totalMales')
  @ApiOperation({
    summary: 'Get the total number of males for a specific area within a TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalMalesForAreaInTA(
    @Param('taName') taName: string,
    @Param('areaName') areaName: string,
  ): Promise<number> {
    return this.populationService.getTotalMalesForAreaInTA(taName, areaName);
  }

  @Get(':taName/:areaName/totalFemales')
  @ApiOperation({
    summary: 'Get the total number of females for a specific area within a TA',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalFemalesForAreaInTA(
    @Param('taName') taName: string,
    @Param('areaName') areaName: string,
  ): Promise<number> {
    return this.populationService.getTotalFemalesForAreaInTA(taName, areaName);
  }

  @Get('district/:district/totalPopulation')
  @ApiOperation({
    summary:
      'Get the total population (both male and female) for a specific district',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Object })
  async getTotalPopulationForDistrict(
    @Param('district') district: string,
  ): Promise<{ total: number; males: number; females: number }> {
    return this.populationService.getTotalPopulationForDistrict(district);
  }

  @Get('district/:district/totalHouseholds')
  @ApiOperation({ summary: 'Get the total households for a specific district' })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalHouseholdsForDistrict(
    @Param('district') district: string,
  ): Promise<number> {
    return this.populationService.getTotalHouseholdsForDistrict(district);
  }

  @Get('district/:district')
  @ApiOperation({ summary: 'Retrieve population data for a specific district' })
  @ApiResponse({ status: 200, description: 'Success', type: [PopulationData] })
  async getPopulationForDistrict(
    @Param('district') district: string,
  ): Promise<PopulationData[]> {
    return this.populationService.findPopulationForDistrict(district);
  }

  @Get('region/:region/totalPopulation')
  @ApiOperation({
    summary:
      'Get the total population (both male and female) for a specific region',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Object })
  async getTotalPopulationForRegion(
    @Param('region') region: string,
  ): Promise<{ total: number; males: number; females: number }> {
    return this.populationService.getTotalPopulationForRegion(region);
  }

  @Get('region/:region/totalHouseholds')
  @ApiOperation({ summary: 'Get the total households for a specific region' })
  @ApiResponse({ status: 200, description: 'Success', type: Number })
  async getTotalHouseholdsForRegion(
    @Param('region') region: string,
  ): Promise<number> {
    return this.populationService.getTotalHouseholdsForRegion(region);
  }

  @Get('region/:region')
  @ApiOperation({ summary: 'Retrieve population data for a specific region' })
  @ApiResponse({ status: 200, description: 'Success', type: [PopulationData] })
  async getPopulationForRegion(
    @Param('region') region: string,
  ): Promise<PopulationData[]> {
    return this.populationService.findPopulationForRegion(region);
  }
}
