import { Document, Types } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    whyHere: [string];
    userType: string;
    roles: [string];
    resumeLink: string;
    linkedInUrl: string;
    twitterUrl: string;
    dribbleUrl: string;
    githubUrl: string;
    kaggleUrl: string;
    skills: [
      Types.ObjectId
    ];
    jobLocations: [
      Types.ObjectId
    ];
    profession: Types.ObjectId;
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
}
