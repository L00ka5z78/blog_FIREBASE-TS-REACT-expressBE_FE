import express, { Router } from 'express';
import { create, deleteBlog, query, read, readAll, update } from '../controllers/blog-controller';

export const blogRouter = Router();
blogRouter

    .get('/:blogID', read)

    .post('/create', create)

    .post('/query', query)

    .post('/update/:blogId', update)

    .delete('/:blogId', deleteBlog)

    .get('/', readAll);
