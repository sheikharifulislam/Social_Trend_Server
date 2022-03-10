const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const allMiddleware = [cors(), express.json(), cookieParser(process.env.COOKIE_NAME)];

module.exports = (app) => {
    app.use('/uploads', express.static('uploads'));
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    allMiddleware.forEach((middleware) => {
        app.use(middleware);
    });
};
