import React, { useContext, useState } from 'react';
import { IPageProps } from '../interfaces';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat';

export const LoginPage = (props: IPageProps) => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLogin = window.location.pathname.includes('login');

    const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');
    };

    return <p>Login Page</p>;
};
