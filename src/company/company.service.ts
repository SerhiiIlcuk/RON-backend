import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/interfaces/user.interface';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { log } from 'console';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { CompanyType } from './interfaces/company-type.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('CompanyType') private readonly companyTypeModel: Model<CompanyType>,
  ) {
  }

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
   * @description get all companies verified
   */
  async getAllCompanies(): Promise<Company[]> {
    const companies = await this.companyModel.find({ verified: true });

    if (!companies) {
      throw new NotFoundException('Companies Not Found');
    }
    return companies;
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
      await this.companyModel.updateOne({ _id: companyId }, updatedCompany);
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
    const company = await this.companyModel.findById(companyId).populate('employees.user');

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }
    return company;
  }

  /**
   * @param updateEmployeeDto
   * @description get company by companyId
   * @return company
   */
  async updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<Company> {
    const companyId = Types.ObjectId(updateEmployeeDto.id);
    const company = await this.companyModel.findById(companyId);
    const userId = Types.ObjectId(updateEmployeeDto.employee.user);
    if (!company) {
      throw new NotFoundException('Company Not Found');
    }
    const index = company.employees.findIndex(employee => employee.user.toHexString() === userId.toHexString());

    if (index !== -1) {
      company.employees[index].roles = updateEmployeeDto.employee.roles;
    } else {
      throw new NotFoundException('Company Employee Not Found');
    }
    await company.save();
    return this.companyModel.findById(companyId).populate('employees.user');
  }

  /**
   * @param deleteEmployeeDto
   * @description get company by companyId
   * @return deleted id
   */
  async deleteEmployee(deleteEmployeeDto: DeleteEmployeeDto) {
    const companyId = Types.ObjectId(deleteEmployeeDto.id);
    const company = await this.companyModel.findById(companyId);
    const userId = Types.ObjectId(deleteEmployeeDto.userId);

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }
    const index = company.employees.findIndex(employee => employee.user.toHexString() === userId.toHexString());

    if (index !== -1) {
      company.employees.splice(index, 1);
    } else {
      throw new NotFoundException('Company Employee Not Found');
    }
    await company.save();
    return this.companyModel.findById(companyId).populate('employees.user');
  }

  /**
   * @description get all companies verified
   */
  async getAllCompanyTypes(): Promise<CompanyType[]> {
    try {
      return await this.companyTypeModel.find({});
    } catch (e) {
      throw new InternalServerErrorException('Server Database Operation error');
    }
  }

  private async isNameUnique(name: string) {
    const company = await this.companyModel.findOne({ name, verified: true });
    if (company) {
      throw new BadRequestException('Company Name must be unique.');
    }
  }
}
