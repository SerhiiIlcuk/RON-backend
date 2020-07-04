import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, UseGuards, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiImplicitParam, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../auth/decorators/user.decorator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { AdminCreateCompanyDto } from './dto/admin-create-company.dto';
import { AddEmployeeDto } from './dto/add-employee.dto';

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
  async register(@Body() createCompanyDto: CreateCompanyDto, @AuthUser() user: any, @Res() res: any) {
    const response = await this.companyService.create(createCompanyDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('by-admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: 'Create company By Admin' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async registerByAdmin(@Body() adminCreateCompanyDto: AdminCreateCompanyDto, @AuthUser() user: any, @Res() res: any) {
    const response = await this.companyService.createByAdmin(adminCreateCompanyDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'add employee to company' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async addEmployee(@Body() addEmployeeDto: AddEmployeeDto, @AuthUser() user: any, @Res() res: any) {
    const response = await this.companyService.addEmployee(addEmployeeDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get all companies' })
  @ApiOkResponse({})
  async getAllCompanies(@Res() res: any) {
    const response = await this.companyService.getAllCompanies();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('/verified')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get verified companies' })
  @ApiOkResponse({})
  async getVerifiedCompanies(@Res() res: any) {
    const response = await this.companyService.getVerifiedCompanies();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async update(@Body() updateCompanyDto: UpdateCompanyDto, @Param() params, @Res() res: any) {
    const response = await this.companyService.updateCompany(updateCompanyDto, params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('detail/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get company details' })
  @ApiOkResponse({})
  async getCompanyDetails(@Param() params, @Res() res: any) {
    const response = await this.companyService.get(params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto, @Res() res: any) {
    const response = await this.companyService.updateEmployee(updateEmployeeDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async deleteEmployee(@Body() deleteEmployeeDto: DeleteEmployeeDto, @Res() res: any) {
    const response = await this.companyService.deleteEmployee(deleteEmployeeDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('company-types')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get all company types' })
  @ApiOkResponse({})
  async getAllCompanyTypes(@Res() res: any) {
    const response = await this.companyService.getAllCompanyTypes();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('publish/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Admin publish the company' })
  @ApiImplicitParam({name: 'id', description: 'id of company'})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async publishCompany(@AuthUser() user: any, @Param() params, @Res() res: any) {
    const response = await this.companyService.publishCompany(params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('un-publish/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Admin un-publish the company' })
  @ApiImplicitParam({name: 'id', description: 'id of company'})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async unPublishCompany(@AuthUser() user: any, @Param() params, @Res() res: any) {
    const response = await this.companyService.unPublishCompany(params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }
}
