const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config()

//passport

const passport=require("./middlewares/auth")



const indexRouter = require('./routes/IndexRouter');
const authRouter = require('./routes/AuthRouter');
const adminRouter = require('./routes/AdminRouter');
const { checkSign } = require('./middlewares/checkSign');

const app = express();


//mongo connect

mongoose.connect(process.env.mongoLink,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
})

const db=mongoose.connection

db.on("error", (err)=>{
     coonsole.log(err)
})

db.on("connected",()=>{
  console.log('connected')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:process.env.sessionSecret,
  saveUninitialized:true,
  resave:true
}))

app.use(passport.initialize)
app.use(passport.session)


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin',checkSign, adminRouter);

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
