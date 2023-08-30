import firebaseAdmin from 'firebase-admin';

export const firebseConnection = () => {
    let serviceAccountKey = require('../config/serviceAccountKey.json');

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccountKey)
    });
};
