/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const port = 3000;
const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('/', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});


/*
 * replace with your credentials
 */
var mediaPlatform = require('./server/facades/media-platform-facade').init(
  'wixmp-410a67650b2f46baa5d003c6.appspot.com',
  '48fa9aa3e9d342a3a33e66af08cd7fe3',
  'fad475d88786ab720b04f059ac674b0e'
).mediaPlatorm;

require('./server/routes/index')(app);
require('./server/routes/upload-url')(app);
require('./server/routes/server-side-upload')(app);
require('./server/routes/server-side-management')(app);
require('./server/routes/authentication')(app);


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
