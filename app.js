require('dotenv').config({path: './.env'});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const db = require('./db');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(function (req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(logger('dev'));
app.use(bodyParser.text({type: '*/*'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.session({secret: process.env.SECRET}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(require('morgan')('combined'));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 3000;

db
	.sequelize // init database connection
	.sync()
	.then(() => {
			db.User.find({ where: {username: 'admin'} }).then(user => {
				if (!user) {
					db.User.build({username: 'admin', password: 'admin'}).save();
				}
			})
			.catch(err => {
				console.error(err);
			});
			app.listen(port, function () {
				console.log(`=======\nApp running on ${port}\nhttp://localhost:${port}\n=======`);
			});
	})
	.catch (err => {
		console.error(err)
	});
