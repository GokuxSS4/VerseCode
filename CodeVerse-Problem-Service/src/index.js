const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server.config');
const {appRouter} = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
const mongoose = require('mongoose');

const connetDB  = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());

app.use('/api',appRouter);

app.get('/ping',(req,res)=>{
    return res.json({
        message: 'Problem Service is alive'
    })
})

app.use(errorHandler);

app.listen(PORT,async ()=>{
    console.log(`Server is Running on ${PORT}`);
    await connetDB();
    console.log("DB is connected");
})