import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

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
        } else {
        }
    }, []);

    return <p>Blog Page</p>;
};
