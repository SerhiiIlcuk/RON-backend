import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  // user id
  @ApiModelProperty({
    example: '1200348394',
    description: 'Id of the User',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  // roles
  @ApiModelProperty({
    example: '["user", "company", "news"]',
    description: 'updated roles of admin',
    format: 'array',
  })
  @IsArray()
  readonly roles: string[];
}
