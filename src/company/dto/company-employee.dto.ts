import { IsString, IsArray, IsOptional } from 'class-validator';

export class EmployeeDto {
  @IsString()
  user: string;

  @IsArray()
  @IsOptional()
  roles: string[];
}
