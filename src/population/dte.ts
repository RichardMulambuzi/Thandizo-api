import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class AddPopulationDataDto {
  @ApiProperty({ description: 'Name of the TA' })
  @IsNotEmpty()
  @IsString()
  ta_name: string;

  @ApiProperty({ description: 'District name' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ description: 'Region name' })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ description: 'Area name' })
  @IsNotEmpty()
  @IsString()
  area: string;

  @ApiProperty({ description: 'Total population' })
  @IsNotEmpty()
  @IsInt()
  total: number;

  @ApiProperty({ description: 'Total number of males' })
  @IsNotEmpty()
  @IsInt()
  total_male: number;

  @ApiProperty({ description: 'Total number of females' })
  @IsNotEmpty()
  @IsInt()
  total_female: number;

  @ApiProperty({ description: 'Total number of households' })
  @IsNotEmpty()
  @IsInt()
  total_hhs: number;
}
