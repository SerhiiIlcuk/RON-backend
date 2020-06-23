import { Body, Controller, Get, Put, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthUser } from '../auth/decorators/user.decorator';
import {UpdateJobPublishReNewDto} from './dto/update-job-publish-renew.dto';
import {log} from 'console';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiUseTags('Job')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: 'Create Job' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async create(@Body() createJobDto: CreateJobDto, @AuthUser() user: any) {
    return await this.jobService.create(createJobDto, user.id);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Update Job' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async update(@Body() updateJobDto: UpdateJobDto) {
    return await this.jobService.update(updateJobDto);
  }

  @Get('detail/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get job by id' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getJob(@Param() params) {
    return await this.jobService.getJob(params.id);
  }

  @Get('')
  @ApiOperation({ title: 'Get job by id' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }

  @Get('employee')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get jobs created by employee' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getEmployeeJobs(@AuthUser() user: any) {
    return await this.jobService.getEmployeeJobs(user.id);
  }

  @Post('update-settings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Update published state of job' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async updatePublishReNew(@Body() updateJobPublishReNewDto: UpdateJobPublishReNewDto) {
    return await this.jobService.updateJobPublishReNew(updateJobPublishReNewDto);
  }

  @Get('job-locations')
  @ApiOperation({ title: 'Get all job location types' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobLocations() {
    return await this.jobService.getAllJobLocations();
  }

  @Get('job-categories')
  @ApiOperation({ title: 'Get all job categories' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobCategories() {
    return await this.jobService.getAllJobCategories();
  }
}
