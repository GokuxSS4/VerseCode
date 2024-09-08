const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3001,
    ATLAS_DB_URL: process.env.ATLAS_DB_URL,
    LOGGER_DB_URL:process.env.LOGGER_DB_URL
}