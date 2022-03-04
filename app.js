const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./model/UserModel');
const server = express();

//imports routes
const authRoute = require('./routes/authRoutes');

//import middleware
const {checkLogin} = require('./middleware/checkLogin');

const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jrudo.mongodb.net/Social_Trend?retryWrites=true&w=majority`,    
    collection: 'sessions',    
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
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
        store,
    }),    
    authRoute,
];

//use middleware
server.use(middleware);

const errorHandler = (err, req, res, next) => {
    if(req.headerSent) {
        return next(err);
    }
    res.status(500).json({error: err})
}

//user error handeling middleware
server.use(errorHandler);

server.get('/',async(req, res) => {
    try{       
        res.send("Well Come"); 
        console.log(req.session);      
    }
    catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

server.get('/all-user',checkLogin, async(req, res) => {
    console.log(req.userName);
    const alluser = await User.find();
    res.send(alluser);
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