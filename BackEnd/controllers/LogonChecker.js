const jwt = require('jsonwebtoken');
const secretKey = 'Guess_Me_1897';

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        req.user = null
        return res.status(200)
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token is not valid' });
        }
        else{
            req.user = user; 
        next();
        }
        
    });
}

module.exports = authenticateToken;
