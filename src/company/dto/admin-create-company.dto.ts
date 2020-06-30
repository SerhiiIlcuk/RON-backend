import { IsNotEmpty, MinLength, MaxLength, IsArray, IsString, IsNumber, IsUrl, IsOptional, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AdminCreateCompanyDto {

  // Name
  @ApiModelProperty({
    example: 'AWS',
    description: 'The name of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Website Url of Company
  @ApiModelProperty({
    example: 'employee@mail.com',
    description: 'The email of first employee of the company',
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly employeeEmail: string;

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

  // City of Company
  @ApiModelProperty({
    example: 'Kostopil',
    description: 'Located City of Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  // Types of the Company
  @ApiModelProperty({
    example: '["1212124554", "3434343434"]',
    description: 'types of the company',
    format: 'array',
  })
  @IsArray()
  @IsNotEmpty()
  readonly companyTypes: string[];
}
