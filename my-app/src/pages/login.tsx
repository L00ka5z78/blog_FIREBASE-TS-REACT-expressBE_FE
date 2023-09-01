import React, { useContext, useState } from 'react';
import { IPageProps } from '../interfaces';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat';
import { SignInWithSocialMedia as SocialMediaPopup } from '../modules/auth';
import logging from '../config/loging';

export const LoginPage = (props: IPageProps) => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLogin = window.location.pathname.includes('login');

    const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);

        SocialMediaPopup(provider)
            .then(async (result: any) => {
                logging.info(result);
                let user = result.user;
                if (user) {
                    let uid = user.uid;
                    let name = user.displayName;
                    if (name) {
                        try {
                            let fire_token = await user.getIdToken();

                            /** if we get token, auth with BE */
                        } catch (error) {
                            setError('Invalid token');
                            logging.error(error);
                            setAuthenticating(false);
                        }
                    } else {
                        /** if no name returned, we could have a custom form here getting users name
                         * depending on the porvider you are using. google generally return
                         * ones, lets just use that for now
                         */
                        setError('The identity provider doesnt have username');
                        setAuthenticating(false);
                    }
                } else {
                    setError('Identity provider is missing necessary infrmation');
                    setAuthenticating(false);
                }
            })
            .catch((error: any) => {
                setError(error.message);
                setAuthenticating(false);
            });
    };

    return <p>Login Page</p>;
};
