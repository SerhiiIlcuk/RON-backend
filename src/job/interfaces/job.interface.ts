import { Document, Types } from 'mongoose';

export interface Job extends Document {
  title: string;
  location: string;
  summary: string;
  description: string;
  howToApply: string;
  published: boolean;
  poster: Types.ObjectId;
  company: Types.ObjectId;
  views: [Types.ObjectId];
  applies: [
    {
      candidate: {
        type: Types.ObjectId,
      },
    }
  ];
  autoReNew: boolean;
  jobCategory: Types.ObjectId;
  jobSubCategories: string[];
}
