var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));

require('./src/routes/index')(app);
require('./src/routes/upload-url')(app);
require('./src/routes/server-side-upload')(app);
require('./src/routes/server-side-management')(app);


/**
 *  error handlers
 */

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;
