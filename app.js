import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import hbs from 'hbs';
import { registerHelpers } from './utils/handlebars.util.js'
import sassMiddleware from 'node-sass-middleware';
import overrideMiddleware from 'method-override';

import indexRouter from './routes/index.routes.js';
import noteRouter from './routes/note.routes.js';

var app = express();

// view engine setup
app.set('views', join(path.resolve(), 'views'));
app.set('view engine', 'hbs');
registerHelpers(hbs)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(overrideMiddleware('_method'))
app.use(sassMiddleware({
  src: join(path.resolve(), './'),
  dest: join(path.resolve(), './public'),
  debug: true
}));
app.use(express.static(join(path.resolve(), './public')));

app.use('/', indexRouter);
app.use('/note', noteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
