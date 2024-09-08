const mongoose = require('mongoose');
const {ATLAS_DB_URL} = require('./serverConfig')

async function connetDB(){
    try {
        if(process.env.NODE_ENV=="development"){
            await mongoose.connect(ATLAS_DB_URL);
            console.log("conntected to database");
        }   
    } catch (error) {
        console.log('Unable to connect to the database')
    }
}

module.exports = connetDB;