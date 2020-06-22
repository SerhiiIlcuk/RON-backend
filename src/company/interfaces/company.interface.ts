import { Document, Types } from 'mongoose';

export interface Company extends Document {
    company: import("F:/freelancer/2020.06.12/git/Ron-backend/src/company/dto/company-employee.dto").EmployeeDto[];
    company: import("F:/freelancer/2020.06.12/git/Ron-backend/src/company/dto/company-employee.dto").EmployeeDto[];
  name: string;
  birthYear: string;
  localEmployees: number;
  totalEmployees: number;
  website: string;
  streetAddressOne: string;
  streetAddressTwo: string;
  city: string;
  zipCode: string;
  neighborhood: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  employees: [{
    user: Types.ObjectId,
    roles: string[],
  }];
  verified: boolean;
}
