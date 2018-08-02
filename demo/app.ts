import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
/**
 * replace with your config
 */
import {init} from './src/facades/media-platform-facade';
import * as indexRoute from './src/routes/index';
import * as filesRoute from './src/routes/files';
import * as authenticationRoute from './src/routes/authentication';

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
  domain: 'wixmp-410a67650b2f46baa5d003c6.appspot.com',
  appId: '48fa9aa3e9d342a3a33e66af08cd7fe3',
  sharedSecret: 'fad475d88786ab720b04f059ac674b0e'
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
