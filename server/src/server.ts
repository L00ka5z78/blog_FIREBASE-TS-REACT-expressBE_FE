import http from 'http';
import express from 'express';
import logging from './config/loging';
import config from './config/config';
import mongoose from 'mongoose';
import { apiAccess, dbConnection, firebseConnection, logMiddleware } from './utils';

const router = express();

/** Server handling */
const httpServer = http.createServer(router);

/** Connect to firebase admin */
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebseConnection();
dbConnection(); /** Connect to mongo database */
logMiddleware(); /** logging middleware */

apiAccess(); /** api access policies */

/** Parse the body. allows server to read incoming requests*/
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
