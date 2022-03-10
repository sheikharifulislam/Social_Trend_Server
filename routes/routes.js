const authRoute = require('./authRoutes');

const routes = [
    {
        path: '/auth',
        handler: authRoute,
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
