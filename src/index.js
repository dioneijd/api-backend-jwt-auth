const { json } = require('express')
const express = require('express')
const routes = require('./router')
const param = require('./param')

const AuthController = require('./controllers/AuthController')
const DashController = require('./controllers/DashController')

const app = express()
const PORT = param.PORT || 3333

app.use(json())


AuthController(app)
DashController(app)


app.listen(PORT, () => console.log(`Server listing on port ${PORT}`))