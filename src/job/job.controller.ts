import { Body, Controller, Get, Put, HttpCode, HttpStatus, Param, Post, UseGuards, Res } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthUser } from '../auth/decorators/user.decorator';
import {UpdateJobPublishReNewDto} from './dto/update-job-publish-renew.dto';
import {log} from 'console';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

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
  async create(@Body() createJobDto: CreateJobDto, @AuthUser() user: any, @Res() res: any) {
    const response = await this.jobService.create(createJobDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async update(@Body() updateJobDto: UpdateJobDto, @Res() res: any) {
    const response = await this.jobService.update(updateJobDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async getJob(@Param() params, @Res() res) {
    const response = await this.jobService.getJob(params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('')
  @ApiOperation({ title: 'Get job by id' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobs(@Res() res: any) {
    const response = await this.jobService.getAllJobs();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async getEmployeeJobs(@AuthUser() user: any, @Res() res: any) {
    const response = await this.jobService.getEmployeeJobs(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
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
  async updatePublishReNew(@Body() updateJobPublishReNewDto: UpdateJobPublishReNewDto, @Res() res: any) {
    const response = await this.jobService.updateJobPublishReNew(updateJobPublishReNewDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('job-locations')
  @ApiOperation({ title: 'Get all job location types' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobLocations(@Res() res: any) {
    const response = await this.jobService.getAllJobLocations();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('job-categories')
  @ApiOperation({ title: 'Get all job categories' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllJobCategories(@Res() res: any) {
    const response = await this.jobService.getAllJobCategories();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Apply to the job' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async applyToJob(@Body() applyJobDto: ApplyJobDto, @Res() res: any, @AuthUser() user: any) {
    const response = await this.jobService.applyToJob(applyJobDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }
}
