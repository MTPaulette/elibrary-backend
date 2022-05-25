const jwt = require('jsonwebtoken');
const key = require('../config/connectionDB').key;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        console.log(token);
        const decoded = jwt.verify(token, key);
        req.user = decoded
        
    } catch (error) {
        return res.status(401).json({
            req: req.body,
            msg: 'authentification failed'
        })
        
    }
} 