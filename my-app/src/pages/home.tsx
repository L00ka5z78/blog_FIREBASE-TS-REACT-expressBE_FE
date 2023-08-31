import React from 'react';
import { IPageProps } from '../interfaces';
import { Navigation } from '../components/Navigation/navbar';
import { Header } from '../components/Header/header';
import { Container } from 'reactstrap';

export const HomePage = (props: IPageProps) => {
    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header title="An old school climber webside" headline="Check out what other climbers have to say about!" />
            <Container className="mt-5">Blog stuff, discussion about grades and gear for sure....</Container>
        </Container>
    );
};
