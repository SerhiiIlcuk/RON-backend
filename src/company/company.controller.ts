import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiImplicitParam, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../auth/decorators/user.decorator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';

@ApiUseTags('Company')
@Controller('company')

export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: 'Create company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async register(@Body() createCompanyDto: CreateCompanyDto, @AuthUser() user: any) {
    return await this.companyService.create(createCompanyDto, user.id);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Update company' })
  @ApiImplicitParam({ name: 'id', description: 'id of company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async update(@Body() updateCompanyDto: UpdateCompanyDto, @Param() params) {
    return await this.companyService.updateCompany(updateCompanyDto, params.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get company details' })
  @ApiImplicitParam({ name: 'id', description: 'id of company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getCompanyDetails(@Param() params) {
    return await this.companyService.get(params.id);
  }

  @Put('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Update roles of employee that belong to company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.companyService.updateEmployee(updateEmployeeDto);
  }

  @Delete('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Delete employee that belong to company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async deleteEmployee(@Body() deleteEmployeeDto: DeleteEmployeeDto) {
    return await this.companyService.deleteEmployee(deleteEmployeeDto);
  }
}
