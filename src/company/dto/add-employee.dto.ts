import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddEmployeeDto {
  // company id
  @ApiModelProperty({
    example: '1200348394',
    description: 'Id of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly companyId: string;

  // email
  @ApiModelProperty({
    example: 'admin@mail.com',
    description: 'email of new employee',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  // roles
  @ApiModelProperty({
    example: '["user", "profile", "job"]',
    description: 'roles of new employee',
    format: 'array',
  })
  @IsArray()
  @IsOptional()
  readonly roles: string[];
}
