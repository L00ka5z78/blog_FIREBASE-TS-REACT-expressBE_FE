import express, { Router } from 'express';
import { extractFirebaseInfo } from '../middleware/extractFirebaseInfo';
import { create, login, read, readAll, validate } from '../controllers/user-controller';

export const userRouter = Router();
userRouter
    .get('/validate', extractFirebaseInfo, validate)

    .get('/:userID', read)

    .post('/create', create)

    .post('/login', login)

    .get('/', readAll);
