var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport=require('passport');
var bodyParser= require('body-parser');
var ldapStrategy = require('passport-ldapauth').Strategy;

var OPTS={
  server:{
    host: 'ldap://localhost:389',
    bindDN:'cn=admin,dc=hazur,dc=org',
    bindCredentials:'gurparsaddfadfa',
    searchBase: 'ou=student,dc=hazur,dc=org',
    searchFilter:'(uid={{username}})'
  }
};

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const apiRouter = require ('./APP_API/routes/index');

var app = express();

passport.use(new ldapStrategy(OPTS,(user,done)=>{
  console.log("Passport LDAP authentication.");
  return done(null,user);
})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());

app.post("/login", (req, res, next) => {
  passport.authenticate("ldapauth", { session: false }, (err, user, info) => {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user)
      return res.json(404, {
        message: "Something went wrong, please try again."
      });
    var token = auth.signToken(user._id, user.role);
    res.json({ token: token });
  })(req, res, next);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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

module.exports = app;

