const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(" ")[1] || req.cookies.token || req.body.token;
    // console.log("Token",token)
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // console.log('Received token:', token);

    jwt.verify(token, process.env.SECRET_TOKEN, async(err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        console.log('Decoded token:', user);
        const userMongo = await User.findById(user.userId)
        req.user = userMongo;
        next();
    });
};

module.exports = authenticateToken;
