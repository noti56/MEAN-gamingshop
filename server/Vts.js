const jwt = require('jsonwebtoken')


const vtUser = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.secret, (err, payload) => {
        if (err) return res.status(403).json({ err: true, msg: err.message })
        req.token = payload
        next()
    })
}

//====================

const decodeToken = (token) => {
    const decoded = jwt.decode(token, process.env.secret)

    return decoded;
}


const adminVer = (req, res, next) => {

    if (!req.token.isAdmin) return res.status(401).json({ err: true, msg: `you are not an admin!` })
    next()
}

//======================
//======================


module.exports = { vtUser, adminVer }