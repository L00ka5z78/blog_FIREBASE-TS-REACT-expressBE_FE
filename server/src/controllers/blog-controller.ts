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

export const login = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Logging in user ...');

    let { uid } = req.body;
    let fire_token = res.locals.fire_token;

    return Blog.findOne({ uid })
        .then((blog) => {
            if (blog) {
                logging.info(`User ${uid} found. Signing in  ...`);
                return res.status(200).json({ blog, fire_token });
            } else {
                logging.info(`User ${uid} not found. Please register...`);
                return create(req, res, next);
            }
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
