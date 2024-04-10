
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'LLL';

const jwt_token_verify = (req, res, next) => {
    
    const token = req.header('token');
   
    if (!token) {
        return res.status(401).json({ message: 'Token not available' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token' });
    }
};

export  default  jwt_token_verify ;