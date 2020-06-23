import * as mongoose from 'mongoose';

export const JobCategorySchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'TITLE_IS_BLANK'],
  },
  subCategories: [{
    type: String,
    required: [true, 'SUBTITLE_IS_BLANK'],
  }],
}, {
  versionKey: false,
  timestamps: true,
});
