import React from 'react';

export interface Props {
    error: string;
}

export const ErrorText = (props: Props) => {
    const { error } = props;

    if (error === '') return null;

    return <small className="text-danger">{error}</small>;
};
