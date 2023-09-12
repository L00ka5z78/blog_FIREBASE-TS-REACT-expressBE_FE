import { IUser } from './user';

export interface IBlog {
    _id: string;
    title: string;
    author: IUser | string;
    content: string;
    headline: string;
    picture?: string;
    createdAt: string;
    updatedAt: string;
}
