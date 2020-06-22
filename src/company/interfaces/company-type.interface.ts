import { Document, Types } from 'mongoose';

export interface CompanyType extends Document {
  typeName: string;
}
