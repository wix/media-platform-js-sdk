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
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '/src/client')));

/**
 * replace with your config
 */
var mediaPlatform = require('./src/facades/media-platform-facade').init({
    domain: 'wixmp-18154a43097a198cc7f682a7.appspot.com',
    appId: '6073c90a3c444da9811997cfb8937d21',
    sharedSecret: '69c4a8a2c9d6f37c4e0638463b5993b8'
}).mediaPlatform;

require('./src/routes/index')(app);
require('./src/routes/files')(app);
require('./src/routes/authentication')(app);


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