import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';
import { CompanySchema } from '../company/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Job', schema: JobSchema}]),
    MongooseModule.forFeature([{name: 'Company', schema: CompanySchema}]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
