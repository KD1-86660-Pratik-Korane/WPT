const config = require('../config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ error: 'Access denied. Invalid token format.' });

    try {
        const decoded = jwt.verify(token, config.secret);
        req.name = decoded.name;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
}

module.exports = verifyToken;
