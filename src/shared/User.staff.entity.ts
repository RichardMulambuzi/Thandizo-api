import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
@Entity({ name: 'thandizo_users' })
export class ThandizoUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  @IsString({ message: 'FullName must be a string' })
  @IsNotEmpty({ message: 'FullName can not be empty' })
  fullName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false })
  @IsNumber()
  @IsNotEmpty({ message: 'Phone number can not be empty' })
  phoneNumber: string;

  @Column({ nullable: false })
  @IsString({ message: 'district must be a string' })
  @IsNotEmpty({ message: 'district can not be empty' })
  district: string;

  @Column({ nullable: false })
  @IsString({ message: 'area must be a string' })
  @IsNotEmpty({ message: 'area can not be empty' })
  area: string;

  @Column({ nullable: false })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password can not be empty' })
  password: string;
  // Corrected column definition
  @Column('text', { array: true, default: [] })
  roles: string[];
}
