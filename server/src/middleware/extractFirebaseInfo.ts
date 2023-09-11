import logging from '../config/loging';
import firebaseAdmin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

export const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Validating token ... ...');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((result) => {
                if (result) {
                    /** add info to result */
                    res.locals.firebase = result;
                    res.locals.fire_token = token;
                    next();
                } else {
                    logging.warn('Invalid token! Unauthorized...');
                    return res.status(401).json({
                        message: 'unauthorized'
                    });
                }
            })
            .catch((error) => {
                logging.error(error);
                return res.status(401).json({
                    error,
                    message: 'unauthorized'
                });
            });
    } else {
        return res.status(401).json({
            message: 'unauthorized'
        });
    }
};
