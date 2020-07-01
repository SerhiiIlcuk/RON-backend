import { Document } from 'mongoose';

export interface Article extends Document {
    title: string;
    category: string;
    status: string;
    featured: boolean;
    content: string;
}
