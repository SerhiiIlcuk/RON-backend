import { Document, Types } from 'mongoose';

export interface JobCategory extends Document {
  name: string;
  subCategories: string[];
}
