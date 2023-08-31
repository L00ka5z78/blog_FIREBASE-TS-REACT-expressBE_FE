import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';

export interface INavigationProps {}

export const Navigation = (props: INavigationProps) => {
    return (
        <Navbar color="light" light sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">
                    📝
                </NavbarBrand>
                <Nav className="mr-auto" navbar />
            </Container>
        </Navbar>
    );
};
