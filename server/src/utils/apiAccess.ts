import express from 'express';

export const apiAccess = () => {
    /** api access policies where we're allowed to get requests from */
    const router = express();

    router.use((req, res, next) => {
        // we can access from anywhere
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        // what headers we can use
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
};
