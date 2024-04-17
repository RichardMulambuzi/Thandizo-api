import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: 'Username' })
  username: string;
  @ApiProperty({ description: 'User password' })
  password: string;
}
