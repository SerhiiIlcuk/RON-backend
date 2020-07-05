import { IsNotEmpty, IsString, IsArray, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddAdminDto {
  // email
  @ApiModelProperty({
    example: 'admin@mail.com',
    description: 'email of the new admin user',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  // roles
  @ApiModelProperty({
    example: '["user", "company", "news"]',
    description: 'updated roles of admin',
    format: 'array',
  })
  @IsArray()
  readonly roles: string[];
}
