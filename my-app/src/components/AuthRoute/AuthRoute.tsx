import React, { useContext } from 'react';
import { UserContext } from '../../context/user';
import logging from '../../config/loging';
import { Redirect } from 'react-router-dom';

export interface IAuthRouteProps {
    children: any;
}

export const AuthRoute = (props: IAuthRouteProps) => {
    const { children } = props;

    const { user } = useContext(UserContext).userState;

    if (user._id === '') {
        logging.info('Unauthorized, redirecting ... ...');
        return <Redirect to="/login" />;
    } else {
        return <>{children}</>;
    }
};
