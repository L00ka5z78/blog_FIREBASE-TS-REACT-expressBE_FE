import React from 'react';

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
