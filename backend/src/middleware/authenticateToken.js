const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(" ")[1] || req.cookies.token || req.body.token;
    console.log("Token",token)
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    console.log('Received token:', token);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        console.log('Decoded token:', user);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
