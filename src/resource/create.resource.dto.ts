import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateResourceDto {
  @ApiProperty({
    description: 'Type of relief resource (e.g., food, water, shelter)',
  })
  @IsString({ message: 'The reliefType must be a string' })
  @IsNotEmpty({ message: 'The reliefType cannot be empty' })
  readonly reliefType: string;

  @ApiProperty({ description: 'Name or description of the resource' })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name cannot be empty' })
  readonly name: string;

  @ApiProperty({ description: 'Quantity of the resource available or needed' })
  @IsNumber({}, { message: 'The quantity must be a number' })
  @IsNotEmpty({ message: 'The quantity cannot be empty' })
  readonly quantity: number;

  @ApiProperty({
    description: 'Location where the resource is stored or needed',
  })
  @IsString({ message: 'The location must be a string' })
  @IsNotEmpty({ message: 'The location cannot be empty' })
  readonly location: string;

  @ApiProperty({ description: 'Quantity of the resource already received' })
  @IsNumber({}, { message: 'The received must be a number' })
  @IsOptional()
  readonly received?: number;

  @ApiProperty({ description: 'Quantity of the resource needed' })
  @IsNumber({}, { message: 'The needed must be a number' })
  @IsOptional()
  readonly needed?: number;

  @ApiProperty({
    description: 'Urgency level of the resource (e.g., high, medium, low)',
  })
  @IsString({ message: 'The urgency must be a string' })
  @IsOptional()
  readonly urgency?: string;

  @ApiProperty({ description: 'Organization or entity providing the resource' })
  @IsString({ message: 'The provider must be a string' })
  @IsOptional()
  readonly provider?: string;

  @ApiProperty({ description: 'Contact information for the provider' })
  @IsString({ message: 'The contact must be a string' })
  @IsOptional()
  readonly contact?: string;

  @ApiProperty({
    description:
      'Timestamp indicating when the resource information was last updated',
  })
  @IsDate()
  @IsOptional()
  readonly timestamp?: Date;

  @ApiProperty({ description: 'Description of the resource' })
  @IsString({ message: 'The description must be a string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'Target population for the resource' })
  @IsString({ message: 'The targetPopulation must be a string' })
  @IsOptional()
  readonly targetPopulation?: string;

  @ApiProperty({ description: 'Delivery method of the resource' })
  @IsString({ message: 'The deliveryMethod must be a string' })
  @IsOptional()
  readonly deliveryMethod?: string;
}
