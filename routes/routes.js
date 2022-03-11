const authRoute = require('./authRoutes');
const userDashboardRoute = require('./userDashboardRoutes');

const routes = [
    {
        path: '/auth',
        handler: authRoute,
    },
    {
        path: '/user-dashboard',
        handler: userDashboardRoute,
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
