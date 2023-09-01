import React from 'react';
import { Card, CardBody } from 'reactstrap';

export interface ILoadingProps {
    dotType?: string;
    children?: any;
}

export const Loading = (props: ILoadingProps) => {
    const { children, dotType } = props;

    return (
        <div className="text-center">
            <div className="stage">
                <div className={dotType} />
            </div>
            {children}
        </div>
    );
};

Loading.defaultProps = {
    dotType: 'dot-bricks'
};

export interface ILoadingComponentProps {
    card?: boolean;
    dotType?: string;
    children?: any;
}
export const LoadingComponent = (props: ILoadingComponentProps) => {
    const { card, children, dotType } = props;

    if (card) {
        return (
            <Card>
                <CardBody>
                    <Loading dotType={dotType}>{children}</Loading>
                </CardBody>
            </Card>
        );
    }
    return <Loading dotType={dotType}>{children}</Loading>;
};

LoadingComponent.defaultProps = {
    card: true,
    dotType: 'dot-bricks'
};
