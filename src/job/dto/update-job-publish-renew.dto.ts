import { IsBoolean, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateJobPublishReNewDto {
  // Job id
  @ApiModelProperty({
    example: '3434343434',
    description: 'The id of the job',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  // Published
  @ApiModelProperty({
    example: true,
    description: 'The status of the job',
    format: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  readonly published: boolean;

  // Auto Renew
  @ApiModelProperty({
    example: false,
    description: 'Auto Renew Status of the job',
    format: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  readonly autoReNew: boolean;
}
