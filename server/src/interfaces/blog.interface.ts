import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IBlog extends Document {
    title: string;
    author: IUser;
    content: string;
    headline: string;
    picture?: string;
}
