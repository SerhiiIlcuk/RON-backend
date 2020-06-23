import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';
import { CompanySchema } from '../company/schemas/company.schema';
import { JobLocationSchema } from '../common/schemas/job-location.schema';
import { JobCategorySchema } from '../common/schemas/job-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Job', schema: JobSchema}]),
    MongooseModule.forFeature([{name: 'Company', schema: CompanySchema}]),
    MongooseModule.forFeature([{name: 'JobLocation', schema: JobLocationSchema}]),
    MongooseModule.forFeature([{name: 'JobCategory', schema: JobCategorySchema}]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
