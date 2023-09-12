import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export interface IBlogPreviewProps {
    _id: string;
    title: string;
    author: string;
    headline: string;
    createdAt: string;
    updatedAt: string;
    children: any;
}
export const BlogPreview = (props: IBlogPreviewProps) => {
    const { _id, author, children, createdAt, updatedAt, headline, title } = props;

    return (
        <Card>
            <CardBody className="p-0">
                <Link to={`/blogs/${_id}`} className="text-primary" style={{ textDecoration: 'none' }}>
                    <h1>
                        <strong>{title}</strong>
                    </h1>
                </Link>
            </CardBody>
        </Card>
    );
};
