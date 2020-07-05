import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        validate: validator.isEmail,
        maxlength: 255,
        minlength: 6,
        required: [true, 'EMAIL_IS_BLANK'],
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'PASSWORD_IS_BLANK'],
    },
    roles: {
        type: [String], // this is for admin roles
    },
    logoImg: {
        type: String,
    },
    whyHere: {
        type: [String],
    },
    userType: {
        type: String,
        enum: ['candidate', 'employee', 'admin'],
        default: 'candidate',
    },
    resumeLink: {
        type: String,
    },
    linkedInUrl: {
        type: String,
        validate: validator.isURL,
    },
    twitterUrl: {
        type: String,
        validate: validator.isURL,
    },
    dribbleUrl: {
        type: String,
        validate: validator.isURL,
    },
    githubUrl: {
        type: String,
        validate: validator.isURL,
    },
    kaggleUrl: {
        type: String,
        validate: validator.isURL,
    },
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
        },
    ],
    jobLocations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobLocation',
        },
    ],
    profession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
    },
    verification: {
        type: String,
        validate: validator.isUUID,
    },
    verified: {
        type: Boolean,
        default: true,
    },
    verificationExpires: {
        type: Date,
        default: Date.now,
    },
    loginAttempts: {
        type: Number,
        default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });
