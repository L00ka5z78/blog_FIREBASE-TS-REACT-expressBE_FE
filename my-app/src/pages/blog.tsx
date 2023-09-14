import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import { Loading, LoadingComponent } from '../components/Loading/LoadingComponent';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navigation } from '../components/Navigation/navbar';
import { ErrorText } from '../components/Error/ErrorText';

export const BlogPage = (props: any) => {
    const [_id, setId] = useState<string>('');
    const [blog, setBlog] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { user } = useContext(UserContext).userState;
    const history = useHistory();

    useEffect(() => {
        let blogID = props.match.params.blogID;

        if (blogID) {
            setId(blogID);
        } else {
            history.push('/');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (_id !== '') getBlog();
        // eslint-disable-next-line
    }, [_id]);

    const getBlog = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs/read/${_id}`
            });
            if (response.status === 201 || response.status === 304) {
                setBlog(response.data.blog);
            } else {
                setError(`Unable to retrieve blog ${_id}`);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async () => {
        setDeleting(true);
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}/blogs/${_id}`
            });
            if (response.status === 200) {
                history.push('/');
            } else {
                setError(`Unable to retrieve blog ${_id}`);
                setDeleting(false);
            }
        } catch (error: any) {
            setError(error.message);
            setDeleting(false);
        }
    };
    if (loading) return <LoadingComponent>Loading Blog ... ...</LoadingComponent>;

    if (blog) {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalBody>
                        {deleting ? <Loading /> : 'Are you sure you want to delete this blog??'}
                        <ErrorText error={error} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => deleteBlog()}>
                            Delete Permanently
                        </Button>
                        <Button color="secondary" onClick={() => setModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    } else {
        return <Redirect to="/" />;
    }
};
