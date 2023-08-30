import mongoose from 'mongoose';
import config from '../config/config';
import logging from '../config/loging';

/** Connect to mongo database */
export const dbConnection = () => {
    mongoose
        .connect(config.mongo.url)
        // .connect(config.mongo.url, config.mongo.options)

        .then(() => {
            logging.info('Mongo database connected');
        })
        .catch((error) => {
            logging.error(error);
        });
};
