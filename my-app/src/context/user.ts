import { DEFAULT_FIRE_TOKEN, DEFAULT_USER, IUser } from '../interfaces';

export interface IUserState {
    user: IUser;
    fire_token: string;
}

export interface IUserActions {
    type: 'login' | 'logout' | 'authenticate';
    payload: IUserState;
}

export const initialUserState: IUserState = {
    user: DEFAULT_USER,
    fire_token: DEFAULT_FIRE_TOKEN
};
