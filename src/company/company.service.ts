import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {Company} from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/interfaces/user.interface';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {log} from 'console';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  /**
   * @description create company
   */
  async create(createCompanyDto: CreateCompanyDto, userId: Types.ObjectId): Promise<Company> {
    const company = new this.companyModel(createCompanyDto);
    await this.isNameUnique(company.name);
    const employee = {
      user: userId,
      roles: ['user', 'profile', 'news', 'job'],
    };
    company.employees.push(employee);
    await company.save();
    return company;
  }

  /**
   * @description create company
   */
  async updateCompany(updateCompanyDto: UpdateCompanyDto, companyId: string): Promise<Company> {
    const company = await this.companyModel.findById(companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const updatedCompany = Object.assign(company, updateCompanyDto);

    try {
      await this.companyModel.updateOne({_id: companyId}, updatedCompany);
      return updatedCompany;
    } catch (e) {
      log(e);
      throw new InternalServerErrorException('Server Error');
    }
  }

  /**
   * @param companyId
   * @description get company by companyId
   * @return company
   */
  async get(companyId: string): Promise<Company> {
    const company = await this.companyModel.findById(companyId);

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }
    return company;
  }

  private async isNameUnique(name: string) {
    const company = await this.companyModel.findOne({name, verified: true});
    if (company) {
      throw new BadRequestException('Company Name must be unique.');
    }
  }
}
