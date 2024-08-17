const jwt = require('jsonwebtoken')

exports.auth = async(req, res, next) => {
    try {
        const token = req.headers['authtoken']
        if (!token) {
            return res.status(401).send('no token')
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        req.user = decoded.user
        // console.log(decoded)
        next()
    }catch(err) {
        console.log(err)
        res.status(500).send('token invalid !!!');
    }
}
