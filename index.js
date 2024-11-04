// setting up server
const express = require('express');
const routes = require('./routes/studentRoute');
const courseRoutes = require('./routes/courseRoute.js');
const userRoute = require('./routes/UserRoute.js');
const { validateAsync } = require('./helpers/validationschema.js');
const cors = require('cors');
require('dotenv').config();

require('./helpers/init_mongodb');
const app = express();

// Enable CORS before defining routes
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', // Allow only React app
}));

app.use(express.json());

// Define routes after enabling CORS
app.use(routes);
app.use(userRoute);

// Handling 404 errors
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

// Start the server on specified PORT or 4000 by default
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Now listening for requests on: http://localhost:${PORT}`);
});
