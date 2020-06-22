import * as mongoose from 'mongoose';

export const JobLocationSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'JOB_LOCATION_NAME_IS_BLANK'],
  },
}, {
  versionKey: false,
  timestamps: true,
});
