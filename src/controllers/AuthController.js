const User = require('../models/User')
const routes = require('../router')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const param = require('../param')


routes.post('/auth/register', register)
routes.post('/auth/authenticate', authenticate)


async function register (req, res) {
    const { name, email, password } = req.body

    try {

        if (await User.findOne( { email } ))
            return res.status(400).json({error: 'User already exist'})

        const user = await User.create({name, email, password})

        user.password = undefined

        return res.status(200).json({
            user,
            token: generateToken({id: user._id})
        })
    } 
    catch (err) {
        return res.status(400).send(err)
    }
}

async function authenticate (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
        return res.status(400).json({error: 'User not found'})
    

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).json({error: 'Invalid password'})

    
    user.password = undefined

    
    return res.json({ 
        user, 
        token: generateToken({id: user._id})
    })
}


function generateToken(props = {}){
    return jwt.sign(props, param.TOKEN_SECRECT, {
        expiresIn: 60000
    })
}



module.exports = app => app.use(routes)



