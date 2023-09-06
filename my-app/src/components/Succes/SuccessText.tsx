import React from 'react';

export interface Props {
    success: string;
}

export const SuccessText = (props: Props) => {
    const { success } = props;

    if (success) return null;

    return <small className="text-success">{success}</small>;
};
