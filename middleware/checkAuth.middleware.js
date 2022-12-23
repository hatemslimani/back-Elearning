const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = decode
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        });
    }
}