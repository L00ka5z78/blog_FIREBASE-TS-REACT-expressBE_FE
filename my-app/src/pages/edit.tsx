import React, { useContext, useEffect, useState } from 'react';
import { IBlog, IPageProps } from '../interfaces';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { UserContext } from '../context/user';
import { RouteComponentProps } from 'react-router-dom';
import config from '../config/config';
import axios from 'axios';
import logging from '../config/loging';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { LoadingComponent } from '../components/Loading/LoadingComponent';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Navigation } from '../components/Navigation/navbar';
import { Header } from '../components/Header/header';
import { ErrorText } from '../components/Error/ErrorText';

export const EditPage = (props: IPageProps & RouteComponentProps<any>) => {
    const [_id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [headline, setHeadline] = useState<string>('');
    const [_editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;

    useEffect(() => {
        let blogID = props.match.params.blogID;

        if (blogID) {
            setId(blogID);
            getBlog(blogID);
        } else {
            setLoading(false);
        }
    }, []);

    const getBlog = async (id: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs/read/${id}`
            });
            if (response.status === 200 || response.status === 304) {
                if (user._id !== response.data.blog.author._id) {
                    logging.warn('This blog is owned by someone else');
                    setId('');
                } else {
                    let blog = response.data.blog as IBlog;

                    setTitle(blog.title);
                    setContent(blog.content);
                    setHeadline(blog.headline);
                    setPicture(blog.picture || '');

                    /** convert html string to draft js editor */
                    const contentBlock = htmlToDraft(blog.content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const _editorState = EditorState.createWithContent(contentState);

                    setEditorState(_editorState);
                }
            } else {
                setError(`Unable to retrieve blog ${id}`);
                setId('');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createBlog = async () => {
        if (title === '' || headline === '' || content === '') {
            setError('Please fill out all required forms');
            setSuccess('');
            return null;
        }
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const response = await axios({
                method: 'POST',
                url: `${config.server.url}/blogs/create`,
                data: {
                    title,
                    picture,
                    headline,
                    content,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setId(response.data.blog._id);
                setSuccess('Blog posted. You can continue to edit on this page');
            } else {
                setError('Unable to save blog');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const editBlog = async () => {
        if (title === '' || headline === '' || content === '') {
            setError('Please fill out all required forms');
            setSuccess('');
            return null;
        }
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const response = await axios({
                method: 'PATCH',
                url: `${config.server.url}/blogs/update/${_id}`,
                data: {
                    title,
                    picture,
                    headline,
                    content,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setSuccess('Blog updated');
            } else {
                setError('Unable to save blog');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return <LoadingComponent>Loading editor ...</LoadingComponent>;
    }

    return (
        <Container className="p-0" fluid>
            <Navigation />
            <Header headline="" title={_id !== '' ? 'Edit your blog, please' : 'Create a Blog'} />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form>
                    <FormGroup>
                        <Label for="title">Title *</Label>
                        <Input type="text" name="title" value={title} id="title" placeholder="Enter a title" disabled={saving} onChange={(event) => setTitle(event.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="picture">Picture URL</Label>
                        <Input
                            type="text"
                            name="picture"
                            value={title}
                            id="picture"
                            placeholder="Picture url, as http://......."
                            disabled={saving}
                            onChange={(event) => setPicture(event.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="headline">Headline *</Label>
                        <Input type="text" name="headline" value={title} id="headline" placeholder="Enter a headline" disabled={saving} onChange={(event) => setHeadline(event.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Content</Label>
                    </FormGroup>
                </Form>
            </Container>
        </Container>
    );
};
