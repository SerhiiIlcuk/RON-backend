import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsUrl, IsOptional, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  // firstName
  @ApiModelProperty({
    example: 'Serhii',
    description: 'The first name of the User',
    format: 'string',
  })
  @IsString()
  readonly firstName: string;

  // lastName
  @ApiModelProperty({
    example: 'Ilchuk',
    description: 'The last name of the User',
    format: 'string',
  })
  @IsString()
  readonly lastName: string;

  // Email
  @ApiModelProperty({
    example: 'surgijilcuk@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  // logo path
  @ApiModelProperty({
    example: 'uploads/21324.png',
    description: 'image path on server file system',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly logoImg: string;

  // resume path
  @ApiModelProperty({
    example: 'uploads/21324.pdf',
    description: 'resume path on server file system',
    format: 'string',
  })
  @IsString()
  readonly resumeLink: string;

  // why are you here
  @ApiModelProperty({
    example: '[0, 2]',
    description: 'array of index of reasons that why you are here',
    format: 'number array',
  })
  @IsNotEmpty()
  @IsArray()
  readonly whyHere: string[];

  // LinkedIn Url
  @ApiModelProperty({
    example: 'https://linkedin.com/serhii',
    description: 'The url of LinkedIn profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly linkedInUrl: string;

  // Twitter Url
  @ApiModelProperty({
    example: 'https://twitter.com/serhii',
    description: 'The url of Twitter profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly twitterUrl: string;

  // Dribble Url
  @ApiModelProperty({
    example: 'https://dribbble.com/serhii',
    description: 'The url of Dribbble profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly dribbleUrl: string;

  // Github Url
  @ApiModelProperty({
    example: 'https://github.com/serhii',
    description: 'The url of Github profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly githubUrl: string;

  // Kaggle Url
  @ApiModelProperty({
    example: 'https://kaggle.com/serhii',
    description: 'The url of Kaggle profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly kaggleUrl: string;

  // profession
  @ApiModelProperty({
    example: '"123323234"',
    description: 'profession of user',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly profession: string;

  // skills
  @ApiModelProperty({
    example: '["123323234", "89893434"]',
    description: 'skills of user',
    format: 'array',
  })
  @IsArray()
  @IsNotEmpty()
  readonly skills: string[];

  // job locations
  @ApiModelProperty({
    example: '["123323234", "454545454"]',
    description: 'job locations of user',
    format: 'array',
  })
  @IsArray()
  @IsNotEmpty()
  readonly jobLocations: string[];
}
