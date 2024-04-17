import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ResourceInventory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the resource' })
  id!: number;

  @Column()
  @ApiProperty({
    description: 'Type of relief resource (e.g., food, water, shelter)',
  })
  @IsString({ message: 'The reliefType must be a string' })
  @IsNotEmpty({ message: 'The reliefType cannot be empty' })
  reliefType: string;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty({ message: 'Resource name cannot be empty' })
  @IsString({ message: 'Resource name must be a string' })
  @ApiProperty({ description: 'Name of the relief resource' })
  resourceName: string;

  @Column({ type: 'integer', nullable: false })
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsInt({ message: 'Quantity must be an integer' })
  @ApiProperty({ description: 'Quantity of the relief resource available' })
  quantity: number;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty({ message: 'Location cannot be empty' })
  @IsString({ message: 'Location must be a string' })
  @ApiProperty({ description: 'Location of the resource' })
  location: string;

  @Column({ default: 0, type: 'int', nullable: true })
  @ApiProperty({ description: 'Quantity of the resource already received' })
  @IsNumber({}, { message: 'The received must be a number' })
  @IsOptional()
  received?: number;

  @Column({ default: 0, type: 'int', nullable: true })
  @ApiProperty({ description: 'Quantity of the resource needed' })
  @IsNumber({}, { message: 'The needed must be a number' })
  @IsOptional()
  needed?: number;

  @Column({ default: 'low', nullable: true })
  @ApiProperty({
    description: 'Urgency level of the resource (e.g., high, medium, low)',
  })
  @IsString({ message: 'The urgency must be a string' })
  @IsOptional()
  urgency?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Organization or entity providing the resource' })
  @IsString({ message: 'The provider must be a string' })
  @IsOptional()
  provider?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Contact information for the provider' })
  @IsString({ message: 'The contact must be a string' })
  @IsOptional()
  contact?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the resource information was updated',
  })
  lastUpdated: Date;

  // Expiration date for perishable items
  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'Expiration date of the resource (if applicable)',
  })
  expirationDate: Date;

  // Barcode or QR code information
  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Barcode or QR code associated with the resource',
  })
  barcode: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Description of the resource' })
  @IsString({ message: 'The description must be a string' })
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Target population for the resource' })
  @IsString({ message: 'The targetPopulation must be a string' })
  @IsOptional()
  targetPopulation?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Delivery method of the resource' })
  @IsString({ message: 'The deliveryMethod must be a string' })
  @IsOptional()
  deliveryMethod?: string;
}
