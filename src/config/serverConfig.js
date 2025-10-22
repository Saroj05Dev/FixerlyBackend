const dotenv = require('dotenv');
dotenv.config();

// Here we are exporting all the env variables that the project uses
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    FAST2SMS_API_KEY: process.env.FAST2SMS_API_KEY,
    USE_FAST2SMS: process.env.USE_FAST2SMS,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}