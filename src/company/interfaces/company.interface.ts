import { Document, Types } from 'mongoose';

export interface Company extends Document {
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
  companyTypes: [
    Types.ObjectId,
  ];
  employees: [{
    user: Types.ObjectId,
    roles: string[],
  }];
  verified: boolean;
}
