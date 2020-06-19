import { Document, Types } from 'mongoose';

export interface Job extends Document {
  title: string;
  location: string;
  summary: string;
  description: string;
  howToApply: string;
  published: boolean;
}
