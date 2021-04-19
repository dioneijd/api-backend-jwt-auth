const User = require('../models/User')
const routes = require('../router')
const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)

routes.get('/dash', getData)

function getData(req, res){
    return res.send('Dashboard2')
}



module.exports = app => app.use(routes)