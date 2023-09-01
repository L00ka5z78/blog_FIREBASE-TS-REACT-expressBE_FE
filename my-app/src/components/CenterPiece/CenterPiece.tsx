import React from 'react';
import { Container } from 'reactstrap';

export interface ICenterPieceProps {
    children?: any;
}

export const CenterPiece = (props: ICenterPieceProps) => {
    const { children } = props;

    return (
        <Container fluid className="p-0">
            <Container
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%',
                    WebkitTransform: 'translate(-50%, -50%'
                }}
                className="d-flex justify-content-center"
            >
                {children}
            </Container>
        </Container>
    );
};
