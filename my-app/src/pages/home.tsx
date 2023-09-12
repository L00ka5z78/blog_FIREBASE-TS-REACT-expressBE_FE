import React, { useEffect, useState } from 'react';
import { IBlog, IPageProps } from '../interfaces';
import { Navigation } from '../components/Navigation/navbar';
import { Header } from '../components/Header/header';
import { Container } from 'reactstrap';
import config from '../config/config';
import axios from 'axios';
import logging from '../config/loging';
import { LoadingComponent } from '../components/Loading/LoadingComponent';
import { Link } from 'react-router-dom';

export const HomePage = (props: IPageProps) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs`
            });
            if (response.status === 200 || response.status === 304) {
                let blogs = response.data.blogs as IBlog[];
                blogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
                setBlogs(blogs);
            }
        } catch (error) {
            logging.error(error);
            setError('Unable to retrive blogs');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    if (loading) {
        return <LoadingComponent>Loading blogs...</LoadingComponent>;
    }

    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header title="An old school climber webside" headline="Check out what other climbers have to say about!" />
            <Container className="mt-5">
                {blogs.length === 0 && (
                    <p>
                        No blogs yet, maybe you should <Link to="/edit">post</Link> one 😃
                    </p>
                )}
                {blogs.map((blog, index) => {
                    return <div key={index}>bla bla bla....</div>;
                })}
            </Container>
        </Container>
    );
};
