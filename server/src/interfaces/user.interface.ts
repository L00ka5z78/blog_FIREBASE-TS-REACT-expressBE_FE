import { Document } from 'mongoose';

export interface IUser extends Document {
    uid: string;
    name: string;
}
