const jwt = require('jsonwebtoken');
const secretKey = 'Guess_Me_1897';

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token is not valid' });
        }

        req.user = user; 
        next();
    });
}

module.exports = authenticateToken;
