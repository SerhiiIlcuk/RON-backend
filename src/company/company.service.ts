import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {Company} from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/interfaces/user.interface';

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
      roles: ['user', 'profile', 'news'],
    };
    company.employees.push(employee);
    await company.save();
    return company;
  }

  private async isNameUnique(name: string) {
    const company = await this.companyModel.findOne({name, verified: true});
    if (company) {
      throw new BadRequestException('Company Name must be unique.');
    }
  }
}
