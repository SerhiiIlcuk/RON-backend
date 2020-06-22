import { Document } from 'mongoose';

export interface CompanyType extends Document {
  typeName: string;
}
