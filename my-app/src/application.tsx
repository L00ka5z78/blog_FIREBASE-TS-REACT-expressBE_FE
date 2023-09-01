import React, { useEffect, useReducer, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import { RouteChildrenProps } from 'react-router-dom';
import { UserContextProvider, initialUserState, userReducer } from './context/user';
import { LoadingComponent } from './components/Loading/LoadingComponent';

export interface IApplicationProps {}

export const Application = (props: IApplicationProps) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);

    /** for debugging purposes */
    const [authState, setAuthState] = useState<string>('Checking localstorage ... ...');

    useEffect(() => {
        setTimeout(() => {
            CheckLocalStorageForCredentials();
        }, 1000);
    }, []);
    /** check to see if we have token.
     * if we do, verify it with BE
     * if not we are logged out initially
     */

    const CheckLocalStorageForCredentials = () => {
        setAuthState('Checking credentials ...');

        const fire_token = localStorage.getItem('fire_token');

        if (fire_token === null) {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthState('No credentials found');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            /** validate with backend later, now hold the placeholder*/
            setAuthState('credentials found, checking ... ...');

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const userContextValues = {
        userState,
        userDispatch
    };
    if (loading) {
        return <LoadingComponent>{authState}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Switch>
                {routes.map((route, index) => {
                    return <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteChildrenProps<any>) => <route.component {...routeProps} />} />;
                })}
            </Switch>
        </UserContextProvider>
    );
};
