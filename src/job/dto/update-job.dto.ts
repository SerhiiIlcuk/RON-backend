import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateJobDto {
  // Job id
  @ApiModelProperty({
    example: 'job id(string)',
    description: 'The id of job',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  // Job Title
  @ApiModelProperty({
    example: 'React Front Developer',
    description: 'The title of the job',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  // Job Location
  @ApiModelProperty({
    example: 'San Fransisco',
    description: 'The location of candidate',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  // Summary
  @ApiModelProperty({
    example: 'Html, React, Scss',
    description: 'Summary of the job',
    format: 'string',
  })
  @IsString()
  readonly summary: string;

  // Description
  @ApiModelProperty({
    example: 'We are growing team in New York. We are finding a developer who can ..',
    description: 'Description of Job',
    format: 'string',
  })
  @IsString()
  readonly description: string;

  // How to apply
  @ApiModelProperty({
    example: 'Please contact on this site',
    description: 'Let the candidate know how to apply this job',
    format: 'string',
  })
  @IsString()
  readonly howToApply: string;

  // Published
  @ApiModelProperty({
    example: true,
    description: 'The status of the job',
    format: 'boolean',
  })
  @IsBoolean()
  readonly published: boolean;
}
