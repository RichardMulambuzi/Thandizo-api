import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({ description: 'Source of the alert' })
  readonly source: string;

  @ApiProperty({ description: 'Title of the alert' })
  @IsNotEmpty({ message: 'Alert title cannot be empty' })
  @IsString({ message: 'Alert title must be a string' })
  readonly alertTitle: string;

  @ApiProperty({ description: 'Content of the alert message' })
  @IsNotEmpty({ message: 'Alert message cannot be empty' })
  @IsString({ message: 'Alert message must be a string' })
  readonly alertMessage: string;

  @ApiProperty({ description: 'Type of the alert' })
  readonly alertType: string;

  @ApiProperty({ description: 'District of the alert' })
  @IsNotEmpty({ message: 'District cannot be empty' })
  @IsString({ message: 'District must be a string' })
  readonly district: string;

  @ApiProperty({ description: 'Area of the alert' })
  @IsNotEmpty({ message: 'Area cannot be empty' })
  @IsString({ message: 'Area must be a string' })
  readonly area: string;
  @ApiProperty({ description: 'Severity level of the alert' })
  readonly severityLevel: string;
}
