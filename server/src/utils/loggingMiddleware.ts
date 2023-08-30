import logging from '../config/loging';
import express from 'express';

export const logMiddleware = () => {
    /** logging middleware */
    const router = express();

    router.use((req, res, next) => {
        logging.info(`METHOD: '${req.method}' - URL: '${req.url}' -IP: '${req.socket.remoteAddress}'`);
        res.on('finish', () => {
            logging.info(`METHOD: '${req.method}' - URL: '${req.url}' -IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}`);
        });
        next();
    });
};
