import express from 'express';

/**Error handling */

export const errorHandling = () => {
    const router = express();

    router.use((req, res, next) => {
        const error = new Error('not found');

        return res.status(404).json({
            message: error.message
        });
    });
};
