import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EmployeeDto } from './company-employee.dto';

export class UpdateEmployeeDto {
  // company id
  @ApiModelProperty({
    example: '1200348394',
    description: 'Id of the Company',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  // employee
  @ApiModelProperty({
    example: '{user: XXX, roles: []}',
    description: 'updated employee of the company',
    format: 'object',
  })
  @IsNotEmpty()
  @Type(() => EmployeeDto)
  readonly employee: EmployeeDto;
}
