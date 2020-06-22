import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { Model, Schema, Types } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import {log} from 'console';
import { UpdateJobPublishReNewDto } from './dto/update-job-publish-renew.dto';
import isEmpty = require('validator/lib/isEmpty');
import { UpdateJobDto } from './dto/update-job.dto';

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
    job.poster = userId;
    try {
      await job.save();
      return job;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }

  /**
   * @description update job
   */
  async update(updateJobDto: UpdateJobDto): Promise<Job> {
    const id = updateJobDto.id;
    const job = await this.jobModel.findById(id);
    const updatedJob = Object.assign(job, updateJobDto);

    try {
      await this.jobModel.updateOne({ _id: id }, updatedJob);
      return updatedJob;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }

  /**
   * @description get job by id
   * @param id
   */
  async getJob(id: string): Promise<Job> {
    try {
      const job = await this.jobModel.findById(Types.ObjectId(id));
      return job;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }

  /**
   * @description get the jobs created by employee
   * @param userId
   */
  async getEmployeeJobs(userId: Types.ObjectId) {
    try {
      const jobs = await this.jobModel.find({poster: userId});
      return jobs;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }

  async updateJobPublishReNew(updateJobPublishReNewDto: UpdateJobPublishReNewDto) {
    const id = updateJobPublishReNewDto.id;
    const job = await this.jobModel.findById(id);
    const updatedJob = Object.assign(job, updateJobPublishReNewDto);

    try {
      await this.jobModel.updateOne({ _id: id }, updatedJob);
      return updatedJob;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }
}
