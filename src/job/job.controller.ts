import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitHeader, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthUser } from '../auth/decorators/user.decorator';

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
}
