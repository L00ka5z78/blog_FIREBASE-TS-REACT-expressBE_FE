import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import { RouteChildrenProps } from 'react-router-dom';

export interface IApplicationProps {}

export const Application = (props: IApplicationProps) => {
    return (
        <Switch>
            {routes.map((route, index) => {
                return <Route key={index} exact={route.exact} path={route.path} render={(routeProps: RouteChildrenProps<any>) => <route.component {...routeProps} />} />;
            })}
        </Switch>
    );
};
