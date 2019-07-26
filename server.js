// Require constants
require('dotenv').config();

const
    express = require('express'),
    app = express(),
    mongoose = require('./db/index'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    PORT = process.env.PORT || 3000;

// Database Connection
    // See mongoose required above

// Configurations

// Middleware
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// ROUTES
app.get('/api', (req, res) => {
    res.json({ message: `API Root`})
});

// Require Routers


// Listening on PORT
app.listen(PORT, err => {
    console.log(err || `Server listening on PORT ${PORT}.`)
})