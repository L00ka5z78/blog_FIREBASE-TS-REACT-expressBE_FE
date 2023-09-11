import { Request, Response, NextFunction } from 'express';
import logging from '../config/loging';
import User from '../models/user.model';
import mongoose from 'mongoose';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Token validated, returning user...');
    let firebase = res.locals.firebase;

    return User.findOne({ uid: firebase.uid })
        .then((user) => {
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(401).json({
                    message: 'user not found'
                });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to register user...');
    let { uid, name } = req.body;
    let fire_token = res.locals.fire_token;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        uid,
        name
    });
    return user
        .save()
        .then((newUser) => {
            logging.info(`New user ${uid} created ...`);
            return res.status(201).json({ user: newUser, fire_token });
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

    return User.findOne({ uid })
        .then((user) => {
            if (user) {
                logging.info(`User ${uid} found. Signing in  ...`);
                return res.status(200).json({ user, fire_token });
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

export const read = (req: Request, res: Response, next: NextFunction) => {};

export const readAll = (req: Request, res: Response, next: NextFunction) => {};
