require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// create express app
const app = express();

// Import Modle
const User = require('./model/UserModel');

// Import Middleware From Middleware Directory
const setMiddleware = require('./middleware/middlewares');
const checkLogin = require('./middleware/checkLogin');

// Import Routes From Routes Directory
const setRoutes = require('./routes/routes');

// Using Middleware From Middleware Directory
setMiddleware(app);

// Using Routes From Routes Directory
setRoutes(app);

const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        error: 'Internal Server Error',
    });
};

// Using Error Handler Middleware
app.use(errorHandler);

app.get('/', async (req, res) => {
    try {
        res.send('Well Come');
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.get('/all-user', checkLogin, async (req, res) => {
    const alluser = await User.find();
    res.send(alluser);
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jrudo.mongodb.net/Social_Trend?retryWrites=true&w=majority`
        );
        console.log(`Server is running on ${port}`);
    } catch (error) {
        console.log(error.message);
    }
});
