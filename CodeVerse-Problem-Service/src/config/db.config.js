const mongoose = require('mongoose');
const {ATLAS_DB_URL} = require('./server.config')

async function connetDB(){
    try {
        if(process.env.NODE_ENV=="development"){
            await mongoose.connect(ATLAS_DB_URL);
        }   
    } catch (error) {
        console.log('Unable to connect to the database')
    }
}

module.exports = connetDB;