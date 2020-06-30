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
import { AdminCreateCompanyDto } from './dto/admin-create-company.dto';
import { EMPLOYEE } from '../common/constants';

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
  async create(createCompanyDto: CreateCompanyDto, userId: string): Promise<Company> {
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
   * @description admin creates the company
   */
  async createByAdmin(adminCreateCompanyDto: AdminCreateCompanyDto): Promise<Company> {
    const employeeEmail = adminCreateCompanyDto.employeeEmail;
    const user = await this.userModel.findOne({email: employeeEmail, userType: EMPLOYEE, verified: true});

    if (!user) {
      throw new BadRequestException('Employee email that you put does not exit');
    }

    const companies = await this.companyModel.find({'employees.user': user._id, 'verified': true});
    if (companies && companies.length > 0) {
      throw new BadRequestException('Employee already belong to other company');
    }

    const company = new this.companyModel(adminCreateCompanyDto);
    await this.isNameUnique(company.name);
    const employee = {
      user: user._id,
      roles: ['user', 'profile', 'news', 'job'],
    };
    company.employees.push(employee);
    company.verified = true;

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
    const userId = updateEmployeeDto.employee.user;
    if (!company) {
      throw new NotFoundException('Company Not Found');
    }

    const index = company.employees.findIndex(employee => {
      return employee.user.toString() === userId.toString();
    });

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
    const index = company.employees.findIndex(employee => employee.user === userId.toHexString());

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
