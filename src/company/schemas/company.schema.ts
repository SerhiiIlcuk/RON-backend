import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const CompanySchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'NAME_IS_BLANK'],
  },
  birthYear: {
    type: String,
  },
  localEmployees: {
    type: Number,
  },
  totalEmployees: {
    type: Number,
  },
  website: {
    type: String,
    validate: validator.isURL,
  },
  streetAddressOne: {
    type: String,
  },
  streetAddressTwo: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  facebookUrl: {
    type: String,
    validate: validator.isURL,
  },
  instagramUrl: {
    type: String,
    validate: validator.isURL,
  },
  twitterUrl: {
    type: String,
    validate: validator.isURL,
  },
  employees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      roles: {
        type: [String],
      },
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: true,
});
