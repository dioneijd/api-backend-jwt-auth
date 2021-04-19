const param = require('../param')

const mongoose = require('mongoose')

mongoose.connect(param.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose