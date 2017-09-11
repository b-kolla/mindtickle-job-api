// initializing custom logger
require('./helpers/logger')();

// checking db connectivity
var sqlite = require('./models/sqlite');
var connection = new sqlite.Connection();
connection.close();

var express = require('express');
var app = express();
var port = 3000;

// request/response middleware
require('./middlewares/requestResponse')(app);

// registering the routes
require('./routes/routes')(app);

// fallback middleware
require('./middlewares/fallback')(app);

// listening on port
app.listen(port, function() {
    console.log('Jobs REST API server listening on', port);
});