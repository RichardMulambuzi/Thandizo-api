import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PopulationData } from './population.model';
import { AddPopulationDataDto } from './dte';

@Injectable()
export class PopulationDataService {
  private readonly logger = new Logger(PopulationDataService.name);

  constructor(
    @InjectRepository(PopulationData)
    private populationDataRepository: Repository<PopulationData>,
  ) {}

  // Retrieve all population data records
  async findAll(): Promise<PopulationData[]> {
    const populationData = await this.populationDataRepository.find();
    this.logger.log('Retrieved all population data records');
    return populationData;
  }

  // Create a new population data record
  async create(populationData: AddPopulationDataDto): Promise<PopulationData> {
    const newPopulationData =
      await this.populationDataRepository.save(populationData);
    this.logger.log('Created a new population data record');
    return newPopulationData;
  }

  async addDataFromJsonFile() {
    try {
      // Read JSON file
      const rawData = fs.readFileSync(
        './src/malawi_city_population.json',
        'utf8',
      );
      const data = JSON.parse(rawData);

      // Iterate through data and add to database
      for (const populationEntry of data) {
        const newEntry = await this.create(populationEntry);
        console.log('Added population data:', newEntry);
      }

      console.log('All data added successfully.');
    } catch (error) {
      console.error('Error adding data from JSON file:', error);
    }
  }

  // Find population data for a specific area within a TA
  async findPopulationForAreaInTA(
    taName: string,
    areaName: string,
  ): Promise<PopulationData[]> {
    const populationData = await this.populationDataRepository.find({
      where: { ta_name: taName, district: areaName },
    });
    this.logger.log(
      `Retrieved population data for area ${areaName} within TA ${taName}`,
    );
    return populationData;
  }

  // Get the total number of households for a specific area within a TA
  async getTotalHouseholdsForAreaInTA(
    taName: string,
    areaName: string,
  ): Promise<number> {
    const populationData = await this.findPopulationForAreaInTA(
      taName,
      areaName,
    );
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(
      `Total households for area ${areaName} within TA ${taName}: ${totalHouseholds}`,
    );
    return totalHouseholds;
  }

  // Get the total number of households for the entire TA
  async getTotalHouseholdsForTA(taName: string): Promise<number> {
    const populationData = await this.findPopulationForTA(taName);
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(`Total households for TA ${taName}: ${totalHouseholds}`);
    return totalHouseholds;
  }

  // Find population data for the entire TA
  async findPopulationForTA(taName: string): Promise<PopulationData[]> {
    const populationData = await this.populationDataRepository.find({
      where: { ta_name: taName },
    });
    this.logger.log(`Retrieved population data for TA ${taName}`);
    return populationData;
  }

  // Get the total number of households for the entire TA
  async getHouseholdsForTA(taName: string): Promise<number> {
    const populationData = await this.findPopulationForTA(taName);
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(`Total households for TA ${taName}: ${totalHouseholds}`);
    return totalHouseholds;
  }

  // Get the total number of households for a specific area within a TA
  async getHouseholdsForAreaInTA(
    taName: string,
    areaName: string,
  ): Promise<number> {
    const populationData = await this.findPopulationForAreaInTA(
      taName,
      areaName,
    );
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(
      `Total households for area ${areaName} within TA ${taName}: ${totalHouseholds}`,
    );
    return totalHouseholds;
  }

  // Get the total number of males for the entire TA
  async getTotalMalesForTA(taName: string): Promise<number> {
    const populationData = await this.findPopulationForTA(taName);
    const totalMales = populationData.reduce(
      (total, data) => total + data.total_male,
      0,
    );
    this.logger.log(`Total males for TA ${taName}: ${totalMales}`);
    return totalMales;
  }

  // Get the total number of females for the entire TA
  async getTotalFemalesForTA(taName: string): Promise<number> {
    const populationData = await this.findPopulationForTA(taName);
    const totalFemales = populationData.reduce(
      (total, data) => total + data.total_female,
      0,
    );
    this.logger.log(`Total females for TA ${taName}: ${totalFemales}`);
    return totalFemales;
  }

  // Get the total number of males for a specific area within a TA
  async getTotalMalesForAreaInTA(
    taName: string,
    areaName: string,
  ): Promise<number> {
    const populationData = await this.findPopulationForAreaInTA(
      taName,
      areaName,
    );
    const totalMales = populationData.reduce(
      (total, data) => total + data.total_male,
      0,
    );
    this.logger.log(
      `Total males for area ${areaName} within TA ${taName}: ${totalMales}`,
    );
    return totalMales;
  }

  // Get the total number of females for a specific area within a TA
  async getTotalFemalesForAreaInTA(
    taName: string,
    areaName: string,
  ): Promise<number> {
    const populationData = await this.findPopulationForAreaInTA(
      taName,
      areaName,
    );
    const totalFemales = populationData.reduce(
      (total, data) => total + data.total_female,
      0,
    );
    this.logger.log(
      `Total females for area ${areaName} within TA ${taName}: ${totalFemales}`,
    );
    return totalFemales;
  }

  // Get the total population (both male and female) for a specific district
  async getTotalPopulationForDistrict(
    district: string,
  ): Promise<{ total: number; males: number; females: number }> {
    const populationData = await this.findPopulationForDistrict(district);
    const totalPopulation = populationData.reduce(
      (total, data) => total + data.total,
      0,
    );
    const totalMales = populationData.reduce(
      (total, data) => total + data.total_male,
      0,
    );
    const totalFemales = populationData.reduce(
      (total, data) => total + data.total_female,
      0,
    );
    this.logger.log(
      `Total population for district ${district}: ${totalPopulation}`,
    );
    this.logger.log(`Total males for district ${district}: ${totalMales}`);
    this.logger.log(`Total females for district ${district}: ${totalFemales}`);
    return { total: totalPopulation, males: totalMales, females: totalFemales };
  }

  // Get the total households for a specific district
  async getTotalHouseholdsForDistrict(district: string): Promise<number> {
    const populationData = await this.findPopulationForDistrict(district);
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(
      `Total households for district ${district}: ${totalHouseholds}`,
    );
    return totalHouseholds;
  }

  // Find population data for a specific district
  async findPopulationForDistrict(district: string): Promise<PopulationData[]> {
    const populationData = await this.populationDataRepository.find({
      where: { district: district },
    });
    this.logger.log(`Retrieved population data for district ${district}`);
    return populationData;
  }

  // Get the total population (both male and female) for a specific region
  async getTotalPopulationForRegion(
    region: string,
  ): Promise<{ total: number; males: number; females: number }> {
    const populationData = await this.findPopulationForRegion(region);
    const totalPopulation = populationData.reduce(
      (total, data) => total + data.total,
      0,
    );
    const totalMales = populationData.reduce(
      (total, data) => total + data.total_male,
      0,
    );
    const totalFemales = populationData.reduce(
      (total, data) => total + data.total_female,
      0,
    );
    this.logger.log(
      `Total population for region ${region}: ${totalPopulation}`,
    );
    this.logger.log(`Total males for region ${region}: ${totalMales}`);
    this.logger.log(`Total females for region ${region}: ${totalFemales}`);
    return { total: totalPopulation, males: totalMales, females: totalFemales };
  }

  // Get the total households for a specific region
  async getTotalHouseholdsForRegion(region: string): Promise<number> {
    const populationData = await this.findPopulationForRegion(region);
    const totalHouseholds = populationData.reduce(
      (total, data) => total + data.total_hhs,
      0,
    );
    this.logger.log(
      `Total households for region ${region}: ${totalHouseholds}`,
    );
    return totalHouseholds;
  }

  // Find population data for a specific region
  async findPopulationForRegion(region: string): Promise<PopulationData[]> {
    const populationData = await this.populationDataRepository.find({
      where: { region: region },
    });
    this.logger.log(`Retrieved population data for region ${region}`);
    return populationData;
  }
}
