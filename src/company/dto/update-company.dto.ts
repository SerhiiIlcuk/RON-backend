import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsNumber, IsUrl, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {

  // Name
  @ApiModelProperty({
    example: 'AWS',
    description: 'The name of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // logo path
  @ApiModelProperty({
    example: 'uploads/21324.png',
    description: 'image path on server file system',
    format: 'string',
  })
  @IsString()
  readonly logoImg: string;

  // splash image path
  @ApiModelProperty({
    example: 'uploads/3421324.png',
    description: 'image path on server file system',
    format: 'string',
  })
  @IsString()
  readonly splashImg: string;

  // Birth Year
  @ApiModelProperty({
    example: '2020',
    description: 'The birth year of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly birthYear: string;

  // Number of local employees
  @ApiModelProperty({
    example: 9,
    description: 'The number of local employees of the Company',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly localEmployees: number;

  // Number of total employees
  @ApiModelProperty({
    example: 19,
    description: 'The number of total employees of the Company',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly totalEmployees: number;

  // Website Url of Company
  @ApiModelProperty({
    example: 'www.aws.com',
    description: 'The site url of Company',
    format: 'url',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly website: string;

  // Street Address 1 of Company
  @ApiModelProperty({
    example: 'Street Address 1',
    description: 'Street Address 1 of Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly streetAddressOne: string;

  // Street Address 2 of Company
  @ApiModelProperty({
    example: 'Street Address 2',
    description: 'Street Address 2 of Company',
    format: 'string',
  })
  @IsString()
  readonly streetAddressTwo: string;

  // City of Company
  @ApiModelProperty({
    example: 'Kostopil',
    description: 'Located City of Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  // Zip Code
  @ApiModelProperty({
    example: '35000',
    description: 'zipcode',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly zipCode: string;

  // Neighborhood
  @ApiModelProperty({
    example: 'Very good neighborhood',
    description: 'Describe about your neighborhood',
    format: 'string',
  })
  @IsString()
  readonly neighborhood: string;

  // Facebook Url of Company
  @ApiModelProperty({
    example: 'https://facebook.com/aws',
    description: 'Facebook Url of Company',
    format: 'url',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly facebookUrl: string;

  // Instagram Url of Company
  @ApiModelProperty({
    example: 'https://instagram.com/aws',
    description: 'Instagram Url of Company',
    format: 'url',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly instagramUrl: string;

  // Twitter Url of Company
  @ApiModelProperty({
    example: 'https://instagram.com/aws',
    description: 'Twitter Url of Company',
    format: 'url',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly twitterUrl: string;

  // Types of the Company
  @ApiModelProperty({
    example: '["121212", "34343434"]',
    description: 'types of the company',
    format: 'array',
  })
  @IsArray()
  @IsNotEmpty()
  readonly companyTypes: string[];
}
