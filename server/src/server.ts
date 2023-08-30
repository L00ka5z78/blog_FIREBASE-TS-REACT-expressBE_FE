import http from 'http';
import express from 'express';
import logging from './config/loging';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';

const router = express();
