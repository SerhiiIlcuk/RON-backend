import { Document, Types } from 'mongoose';

export interface Job extends Document {
  title: string;
  summary: string;
  description: string;
  howToApply: string;
  published: boolean;
  poster: Types.ObjectId;
  company: Types.ObjectId;
  views: Types.ObjectId[];
  applies: Array<{
    candidate: {
      type: Types.ObjectId,
    },
  }>;
  autoReNew: boolean;
  experienceLevel: string;
  jobLocation: Types.ObjectId;
  jobCategory: Types.ObjectId;
  jobSubCategories: string[];
}
