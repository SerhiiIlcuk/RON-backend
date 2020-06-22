import * as mongoose from 'mongoose';

export const SkillSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'SKILL_NAME_IS_BLANK'],
  },
}, {
  versionKey: false,
  timestamps: true,
});
