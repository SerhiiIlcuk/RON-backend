import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteEmployeeDto {
  // company id
  @ApiModelProperty({
    example: '1200348394',
    description: 'Id of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  // employee id
  @ApiModelProperty({
    example: '124893483',
    description: 'delete employee of the company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
