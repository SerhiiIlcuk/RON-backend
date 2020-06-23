import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsNumber, IsUrl, IsBoolean, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateJobDto {

  // Job Title
  @ApiModelProperty({
    example: 'React Front Developer',
    description: 'The title of the job',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

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

  // Experience Level
  @ApiModelProperty({
    example: '1',
    description: 'The id of experience level',
    format: 'string',
  })
  @IsString()
  readonly experienceLevel: string;

  // Job Location
  @ApiModelProperty({
    example: '3034903490',
    description: 'The job location id',
    format: 'string',
  })
  @IsString()
  readonly jobLocation: string;

  // Job Category
  @ApiModelProperty({
    example: '3034903490',
    description: 'The job category id',
    format: 'string',
  })
  @IsString()
  readonly jobCategory: string;

  // Job SubCategories
  @ApiModelProperty({
    example: '["sub category 1", "sub category 2"]',
    description: 'The sub categories according to job category',
    format: 'array',
  })
  @IsArray()
  readonly jobSubCategories: string[];
}
