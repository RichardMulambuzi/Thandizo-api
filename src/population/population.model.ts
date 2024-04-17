import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  MinLength,
  MaxLength,
} from 'class-validator';

@Entity()
export class PopulationData {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the population data' })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Name of the TA' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  ta_name: string;

  @Column({ length: 100 })
  @ApiProperty({ description: 'District name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  district: string;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Region name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  region: string;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Area name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  area: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Total population' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  total: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Total number of males' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  total_male: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Total number of females' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  total_female: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Total number of households' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  total_hhs: number;
}
