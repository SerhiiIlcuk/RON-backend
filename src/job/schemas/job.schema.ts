import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'TITLE_IS_BLANK'],
  },
  summary: {
    type: String,
  },
  description: {
    type: String,
  },
  howToApply: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  applies: [
    {
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  autoReNew: {
    type: Boolean,
    default: false,
  },
  experienceLevel: {
    type: String,
  },
  jobLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobLocation',
  },
  jobCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobCategory',
  },
  jobSubCategories: [
    {
      type: String,
    },
  ],
}, {
  versionKey: false,
  timestamps: true,
});
