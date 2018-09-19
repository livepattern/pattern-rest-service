require('dotenv').config();

let express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser');

let settings = require('./config')
  , indexRoutes = require('./routes');

let app = express();


function configure() {

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // middleware setup
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  configureCORS();

  // routers
  configureRouters();

  // errors handlers
  configureErrorHandlers();

}

function configureCORS() {
  if (settings.cors)
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
      res.header('Access-Control-Max-Age', '600');
      if (req.method === 'OPTIONS') return res.sendStatus(200);
      else return next();
    })
}

function configureRouters() {
  app.use('/api/v1', indexRoutes);
}

function configureErrorHandlers() {

  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

configure();

module.exports = {
  app,
};