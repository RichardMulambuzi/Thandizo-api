import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The full name of the staff member' })
  @IsString({ message: 'FullName must be a string' })
  @IsNotEmpty({ message: 'FullName cannot be empty' })
  fullName: string;

  @ApiProperty({ description: 'The username for the staff member' })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @ApiProperty({ description: 'The phone number of the staff member' })
  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  phoneNumber: string;

  @ApiProperty({
    description: 'The district where the staff member is located',
  })
  @IsString({ message: 'District must be a string' })
  @IsNotEmpty({ message: 'District cannot be empty' })
  district: string;

  @ApiProperty({ description: 'The area where the staff member is located' })
  @IsString({ message: 'Area must be a string' })
  @IsNotEmpty({ message: 'Area cannot be empty' })
  area: string;

  @ApiProperty({ description: "The password for the staff member's account" })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @ApiProperty({
    description: 'The roles assigned to the staff member',
    type: [String],
  })
  @IsArray({ message: 'Roles must be an array of strings' })
  roles: string[];
}
