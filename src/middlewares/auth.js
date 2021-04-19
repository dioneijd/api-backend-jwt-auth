const jwt = require('jsonwebtoken')
const param = require('../param')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({error: 'No token provided'})


    const parts = authHeader.split(' ')

    if (!parts.length == 2)
        return res.status(401).json({error: 'Token error'})

    const [scheme, token] = parts

    if (!scheme.includes('Bearer'))
        return res.status(401).json({error: 'Token not well-formatted'})

    jwt.verify(token, param.TOKEN_SECRECT, (err, decoded) => {
        if (err)
            return res.status(401).json({error: 'Token Invalid'})

        
        
        req.user = decoded        
        next()
    })
}
