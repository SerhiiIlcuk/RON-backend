import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsUrl } from 'class-validator';
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

  // LinkedIn Url
  @ApiModelProperty({
    example: 'https://linkedin.com/serhii',
    description: 'The url of LinkedIn profile',
    format: 'url',
  })
  @IsString()
  @IsUrl()
  readonly linkedInUrl: string;
}
