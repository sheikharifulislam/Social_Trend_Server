const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const server = express();

//imports routes
const authRoute = require('./routes/authRoutes');

var store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jrudo.mongodb.net/Social_Trend?retryWrites=true&w=majority`,
    collection: 'sessions',
    expire: 5 * 24 * 60 * 60 * 1000,
  });

//middleware array
const middleware = [
    cors(),
    morgan('dev'),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: (( 5 * 24) * 60 * 60 * 1000),
        }
    }),
    authRoute,
];

//use middleware
server.use(middleware);

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