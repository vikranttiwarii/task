const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token!='null') {
        jwt.verify(token, process.env.SECRET_KEY, (err, reasponse) => {
            if (err) {
                res.status(200).json({ message: "Invalid Token" })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            msg: 'token not found'
        })
    }
}