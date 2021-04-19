require('dotenv').config()


module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    TOKEN_SECRECT: process.env.TOKEN_SECRECT
}