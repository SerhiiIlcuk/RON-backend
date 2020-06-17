import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../auth/decorators/user.decorator';

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
}
