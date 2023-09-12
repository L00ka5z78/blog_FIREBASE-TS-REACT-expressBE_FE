import { Request, Response, NextFunction } from 'express';
import logging from '../config/loging';
import Blog from '../models/blog.model';
import mongoose from 'mongoose';

export const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to register user...');
    let { author, title, content, headline, picture } = req.body;

    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        content,
        headline,
        picture
    });
    return blog
        .save()
        .then((newBlog) => {
            logging.info(`New blog created ...`);
            return res.status(201).json({ blog: newBlog });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.userID;
    logging.info(`Incoming read for ${_id}... ...`);

    return Blog.findById(_id)
        .then((blog) => {
            if (blog) {
                return res.status(200).json({ blog });
            } else {
                return res.status(400).json({ message: 'not found' });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info(`Incoming read for all users`);

    return Blog.find()
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export const query = (req: Request, res: Response, next: NextFunction) => {
    logging.info(`Incoming query...`);

    return Blog.find(req.body)
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    logging.info(`Incoming update for ${_id} ...`);

    return Blog.findById(_id)
        .exec()
        .then((blog) => {
            if (blog) {
                blog.set(req.body);
                blog.save()
                    .then((newBlog) => {
                        logging.info(`Blog updated ...`);
                        return res.status(201).json({ blog: newBlog });
                    })
                    .catch((error) => {
                        logging.error(error);
                        return res.status(500).json({
                            error
                        });
                    });
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.userID;
    logging.warn(`Incoming delete for ${_id}... ...`);

    return Blog.findByIdAndRemove(_id)
        .then(() => {
            return res.status(200).json({ message: 'Blog was deleted' });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};
