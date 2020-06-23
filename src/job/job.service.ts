import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { Model, Schema, Types } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import {log} from 'console';
import { UpdateJobPublishReNewDto } from './dto/update-job-publish-renew.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Company } from '../company/interfaces/company.interface';
import { JobLocation } from '../common/interfaces/job-location.interface';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('JobLocation') private readonly jobLocationModel: Model<JobLocation>,
  ) {}

  /**
   * @description create job
   */
  async create(createJobDto: CreateJobDto, userId: Types.ObjectId): Promise<Job> {
    try {
      const job = new this.jobModel(createJobDto);
      const company = await this.companyModel.findOne({'employees.user': userId, 'verified': true});
      job.poster = userId;
      job.company = company._id;

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
   * @description get all jobs
   */
  async getAllJobs(): Promise<Job[]> {
    try {
      let jobs: any;
      jobs = await this.jobModel.find({ published: true }).populate('company');
      return jobs;
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
      let job: any;
      job = await this.jobModel.findById(Types.ObjectId(id));
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
      let jobs: any;
      jobs = await this.jobModel.find({ poster: userId });
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

  /**
   * @description get all job location types
   */
  async getAllJobLocations(): Promise<JobLocation[]> {
    try {
      let jobLocations: any;
      jobLocations = await this.jobLocationModel.find({});
      return jobLocations;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }
}
