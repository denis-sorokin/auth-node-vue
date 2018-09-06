require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('combined'));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`=======\nApp running on ${port}\nhttp://localhost:${port}\n=======`);
});

module.exports = app;
