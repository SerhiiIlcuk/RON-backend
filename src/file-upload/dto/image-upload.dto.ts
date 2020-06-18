import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ImageUploadDto {

  @ApiModelProperty({
    description: 'The base64 of image',
    format: 'base64 string',
  })
  @IsString()
  @IsNotEmpty()
  readonly base64: string;
}
