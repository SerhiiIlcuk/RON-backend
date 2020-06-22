import { Document } from 'mongoose';

export interface JobLocation extends Document {
  name: string;
}
