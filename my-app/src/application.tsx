import React, { useEffect, useReducer, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import { RouteChildrenProps } from 'react-router-dom';
import { UserContextProvider, initialUserState, userReducer } from './context/user';
import { LoadingComponent } from './components/Loading/LoadingComponent';
import { AuthRoute } from './components/AuthRoute/AuthRoute';
import { Validate } from './modules/auth';
import logging from './config/loging';

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
            return Validate(fire_token, (error, user) => {
                if (error) {
                    logging.error(error);
                    setAuthState('User not found, logging out...');
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthState('User authenticated...');
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
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
                    if (route.auth) {
                        return (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                render={(routeProps: RouteChildrenProps<any>) => (
                                    <AuthRoute>
                                        <route.component {...routeProps} />
                                    </AuthRoute>
                                )}
                            />
                        );
                    }

                    return <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteChildrenProps<any>) => <route.component {...routeProps} />} />;
                })}
            </Switch>
        </UserContextProvider>
    );
};
