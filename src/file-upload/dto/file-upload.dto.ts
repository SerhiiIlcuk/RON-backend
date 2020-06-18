import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {

  @ApiModelProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  readonly file: any;
}
