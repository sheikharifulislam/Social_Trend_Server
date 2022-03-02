const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const server = express();

server.get('/',async(req, res) => {
    try{
        res.send("Well Come");
    }
    catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
})




const port = process.env.PORT || 5000;
server.listen(port, async() => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jrudo.mongodb.net/Social_Trend?retryWrites=true&w=majority`);
        console.log(`server is running on ${port}`);
    }
    catch(error) {
        console.log(error.message);
    }
})