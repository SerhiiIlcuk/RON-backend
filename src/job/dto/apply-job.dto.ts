import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ApplyJobDto {
  // Job id
  @ApiModelProperty({
    example: '3434343434',
    description: 'The id of the job',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
