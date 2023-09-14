import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IBlog, IUser } from '../interfaces';
import { UserContext } from '../context/user';
import { Loading, LoadingComponent } from '../components/Loading/LoadingComponent';
import { Navigation } from '../components/Navigation/navbar';
import { ErrorText } from '../components/Error/ErrorText';
import { Header } from '../components/Header/header';

const BlogPage = (props: RouteComponentProps<any>) => {
    const [_id, setId] = useState<string>('');
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    const history = useHistory();

    useEffect(() => {
        let blogID = props.match.params.blogID;
        if (blogID) {
            setId(blogID);
        } else {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if (_id !== '') getBlog();
        // eslint disable-next-line
    }, [_id]);

    const getBlog = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs/read/${_id}`
            });
            if (response.status === 200 || response.status === 304) {
                setBlog(response.data.blog);
            } else {
                setError(`Unable to retrieve blog ${_id}`);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
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
                setTimeout(() => {
                    history.push('/');
                }, 1000);
            } else {
                setError(`Unable to delete blog ${_id}`);
                setDeleting(false);
            }
        } catch (error: any) {
            setError(error.message);
            setDeleting(false);
        }
    };
    if (loading) return <LoadingComponent>Loading blog...</LoadingComponent>;

    if (blog) {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalBody>
                        {deleting ? <Loading /> : 'Are you sure you want to delete this post?'}
                        <ErrorText error={error} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => deleteBlog()}>
                            Delete permanently
                        </Button>
                        <Button color="secondary" onClick={() => setModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Header image={blog.picture || undefined} headline={blog.headline} title={blog.title}>
                    <p className="text-white">
                        Posted by {(blog.author as IUser).name} on {new Date(blog.createdAt).toLocaleString()}
                    </p>
                </Header>
                <Container className="mt-5">
                    {user._id === (blog.author as IUser)._id && (
                        <Container fluid className="p-0">
                            <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}>
                                <i className="fas fa-edit mr-2"></i>Edit
                            </Button>
                            <Button color="danger" onClick={() => setModal(true)}>
                                <i className="far fa-trash-alt mr-2"></i>Delete
                            </Button>
                            <hr />
                        </Container>
                    )}
                    <ErrorText error={error} />
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Container>
            </Container>
        );
    } else {
        return <Redirect to="/" />;
    }
};
export default withRouter(BlogPage);
