import { Request, Response, NextFunction } from 'express';
import logging from '../config/loging';
import User from '../models/user.model';

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

export const create = (req: Request, res: Response, next: NextFunction) => {};

export const login = (req: Request, res: Response, next: NextFunction) => {};

export const read = (req: Request, res: Response, next: NextFunction) => {};

export const readAll = (req: Request, res: Response, next: NextFunction) => {};
