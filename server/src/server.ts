import http from 'http';
import express from 'express';
import logging from './config/loging';
import config from './config/config';
import mongoose from 'mongoose';
import { apiAccess, dbConnection, errorHandling, firebseConnection, logMiddleware } from './utils';
import { userRouter } from './routes';

const router = express();

/** Server handling */
const httpServer = http.createServer(router);

/** Connect to firebase admin */
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebseConnection();
dbConnection(); /** Connect to mongo database */
logMiddleware(); /** logging middleware */
errorHandling(); /**Error handling */

apiAccess(); /** api access policies */

/** Parse the body. allows server to read incoming requests*/
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//routes todo
router.use('/user', userRouter);

/** listen for requests */
httpServer.listen(config.server.port, () => {
    logging.info(`Server is running at ${config.server.host}:${config.server.port}... `);
});
