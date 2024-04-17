import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('alert')
export class Alert {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Source of the alert' })
  source?: string; // Use '?' for optional fields instead of '!:'

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Alert title cannot be empty' })
  @IsString({ message: 'Alert title must be a string' })
  @ApiProperty({ description: 'Title of the alert' })
  alertTitle: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Alert message cannot be empty' })
  @IsString({ message: 'Alert message must be a string' })
  @ApiProperty({ description: 'Content of the alert message' })
  alertMessage: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Type of the alert' })
  alertType?: string; // Corrected the field name and made it optional

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'District cannot be empty' })
  @IsString({ message: 'District must be a string' })
  @ApiProperty({ description: 'District of the alert' })
  district: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Area cannot be empty' })
  @IsString({ message: 'Area must be a string' })
  @ApiProperty({ description: 'Area of the alert' })
  area: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Timestamp when the alert was issued' })
  timestamp: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Severity level of the alert' })
  severityLevel?: string; // Use '?' for optional fields

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'SID of the message sent via Twilio' })
  messageSid?: string; // Optional field for the Twilio message SID
}
