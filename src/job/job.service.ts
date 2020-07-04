import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { Model, Schema, Types } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { log } from 'console';
import { UpdateJobPublishReNewDto } from './dto/update-job-publish-renew.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Company } from '../company/interfaces/company.interface';
import { JobLocation } from '../common/interfaces/job-location.interface';
import { JobCategory } from '../common/interfaces/job-category.interface';
import { ApplyJobDto } from './dto/apply-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('JobLocation') private readonly jobLocationModel: Model<JobLocation>,
    @InjectModel('JobCategory') private readonly jobCategoryModel: Model<JobCategory>,
  ) {
  }

  /**
   * @description create job
   */
  async create(createJobDto: CreateJobDto, userId: Types.ObjectId): Promise<Job> {
    try {
      const job = new this.jobModel();
      // this is for making string type to object id
      Object.assign(job, createJobDto);
      job.jobCategory = Types.ObjectId(createJobDto.jobCategory);
      const company = await this.companyModel.findOne({ 'employees.user': userId, 'verified': true });
      job.poster = userId;
      job.company = company._id;

      await job.save();
      return job;
    } catch (e) {
      log(e);
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
      job = await this.jobModel.findById(Types.ObjectId(id))
        .populate('jobCategory')
        .populate('company')
        .populate('jobLocation');
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

  /**
   * @description get all job location types
   */
  async getAllJobCategories(): Promise<JobCategory[]> {
    try {
      let jobCategories: any;
      jobCategories = await this.jobCategoryModel.find({});
      return jobCategories;
    } catch (e) {
      throw new InternalServerErrorException('Server database operation error');
    }
  }

  /**
   * @description apply to job
   */
  async applyToJob(applyJobDto: ApplyJobDto, userId: Types.ObjectId): Promise<Job> {
    const job = await this.jobModel.findById(applyJobDto.id).populate('company');
    if (job.applies && job.applies.length > 0) {
      // if already applied
      const index = job.applies.findIndex(apply => apply.candidate.toString() === userId.toString());
      if (index !== -1) {
        throw new HttpException('You already applied on this job', HttpStatus.BAD_REQUEST);
      }
    }
    job.applies.push({
      candidate: userId,
    });
    await job.save();
    return job;
  }
}
