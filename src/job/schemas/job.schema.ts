import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const JobSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'TITLE_IS_BLANK'],
  },
  location: {
    type: String,
    required: [true, 'LOCATION_IS_BLANK'],
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
}, {
  versionKey: false,
  timestamps: true,
});
