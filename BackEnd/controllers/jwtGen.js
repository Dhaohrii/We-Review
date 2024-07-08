const jwt = require('jsonwebtoken');
const secretKey = 'Guess_Me_1897'; 

function getToken(id, email, fullname, role) {
    try {
        const token = jwt.sign({ id, email, fullname,role }, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error signing token:', error);
        throw error; 
    }
}

module.exports = { getToken };
