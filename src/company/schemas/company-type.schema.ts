import * as mongoose from 'mongoose';

export const CompanyTypeSchema = new mongoose.Schema ({
  typeName: {
    type: String,
    required: [true, 'TYPE_NAME_IS_BLANK'],
  },
}, {
  versionKey: false,
  timestamps: true,
});
