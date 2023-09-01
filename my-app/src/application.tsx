import React, { useEffect, useReducer, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import { RouteChildrenProps } from 'react-router-dom';
import { initialUserState, userReducer } from './context/user';

export interface IApplicationProps {}

export const Application = (props: IApplicationProps) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);

    /** for debugging purposes */
    const [authState, setAuthState] = useState<string>('Checking localstorage ... ...');

    useEffect(() => {
        setTimeout(() => {}, 1000);
    }, []);

    return (
        <Switch>
            {routes.map((route, index) => {
                return <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteChildrenProps<any>) => <route.component {...routeProps} />} />;
            })}
        </Switch>
    );
};
