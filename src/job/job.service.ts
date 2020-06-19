import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { Model, Types } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
  ) {}

  /**
   * @description create job
   */
  async create(createJobDto: CreateJobDto, userId: Types.ObjectId): Promise<Job> {
    const job = new this.jobModel(createJobDto);
    await job.save();
    return job;
  }
}
