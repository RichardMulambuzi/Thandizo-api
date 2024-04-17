import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'FullName must be a string' })
  @IsNotEmpty({ message: 'FullName can not be empty' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username can not be empty' })
  username?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsNotEmpty({ message: 'Phone number can not be empty' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'District must be a string' })
  @IsNotEmpty({ message: 'District can not be empty' })
  district?: string;

  @IsOptional()
  @IsString({ message: 'Area must be a string' })
  @IsNotEmpty({ message: 'Area can not be empty' })
  area?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password can not be empty' })
  password?: string;

  @IsOptional()
  @IsArray({ message: 'Roles must be an array of strings' })
  roles?: string[];
}
