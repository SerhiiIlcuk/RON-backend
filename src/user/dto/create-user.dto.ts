import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

    // fullName
    /*@ApiModelProperty({
      example: 'Serhii Ilchuk',
      description: 'The name of the User',
      format: 'string',
      minLength: 6,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly fullName: string;*/

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

    // User type
    @ApiModelProperty({
      example: 'candidate',
      description: 'The type of the User',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly userType: string;

    // Password
    @ApiModelProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
  }
