import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
/**
 * replace with your config
 */
import {init} from './src/facades/media-platform-facade';
import indexRoute from './src/routes/index';
import filesRoute from './src/routes/files';
import authenticationRoute from './src/routes/authentication';

const app = express();

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.static(path.join(__dirname, '/../dist/statics')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '/src/client')));

init({
  domain: 'wixmp-18154a43097a198cc7f682a7.appspot.com',
  appId: '6073c90a3c444da9811997cfb8937d21',
  sharedSecret: '69c4a8a2c9d6f37c4e0638463b5993b8'
});

indexRoute(app);
filesRoute(app);
authenticationRoute(app);

app.use((req, res, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

export default app;
export {app};
