import * as mongoose from 'mongoose';

export const ProfessionSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'PROFESSION_NAME_IS_BLANK'],
  },
}, {
  versionKey: false,
  timestamps: true,
});
