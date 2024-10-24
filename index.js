//setting up server//

const express = require ('express');
const routes = require('./routes/studentRoute')
const courseRoutes = require('./routes/courseRoute.js');
require('dotenv').config();

require('./helpers/init_mongodb');
const app = express();

app.use(express.json())

app.use(routes);

//handling 404 error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(process.env.port || 4000, function(){
    console.log('Now listening for request on: http://localhost:4000');
});











//on terminal type node index.js//



