import { Document } from 'mongoose';

export interface Profession extends Document {
  name: string;
}
