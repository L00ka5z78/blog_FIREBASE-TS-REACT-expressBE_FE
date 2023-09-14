import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

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
            if (response.status === 200 || response.status === 304) {
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
            setLoading(false);
        }
    };

    return <p>Blog Page</p>;
};
