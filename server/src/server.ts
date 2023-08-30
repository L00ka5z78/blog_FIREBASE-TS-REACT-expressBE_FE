import http from 'http';
import express from 'express';
import logging from './config/loging';
import config from './config/config';
import mongoose from 'mongoose';
import { dbConnection, firebseConnection } from './utils';

const router = express();

/** Server handling */
const httpServer = http.createServer(router);

/** Connect to firebase admin */
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebseConnection();
dbConnection(); /** Connect to mongo database */
