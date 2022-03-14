const authRoute = require('./authRoutes');
const profileRoutes = require('./profileRoutes');

const routes = [
    {
        path: '/auth',
        handler: authRoute,
    },
    {
        path: '/profile',
        handler: profileRoutes,
    },
    // {
    //     path: '/user',
    //     handler: userRoute,
    // },
];

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
