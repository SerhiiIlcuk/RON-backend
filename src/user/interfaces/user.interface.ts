import { Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    whyHere: [string];
    userType: string;
    resumeLink: string;
    linkedInUrl: string;
    twitterUrl: string;
    dribbleUrl: string;
    githubUrl: string;
    kaggleUrl: string;
    skills: [string];
    jobLocations: [string];
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
}
