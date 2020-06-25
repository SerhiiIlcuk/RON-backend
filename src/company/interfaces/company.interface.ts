import { Document, Types } from 'mongoose';

export interface Company extends Document {
  name: string;
  logoImg: string;
  splashImg: string;
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
  companyTypes: string[];
  employees: Array<{
    user: string,
    roles: string[],
  }>;
  verified: boolean;
}
