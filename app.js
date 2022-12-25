const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');
const User = require('./models/user');

const app = express();


mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", "ejs");
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/hotel',
    collection: 'sessions'
  });
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:store,
  }));

app.use(flash());

app.use((req, res, next)=>{
      if(!req.session.user){
          next();
      } else{
          User.findById(req.session.user._id, (err, user)=>{
               if(!err){
                req.user = user;
                
                
                next();
               }
          })
          
      }
  });
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.adminLogged;
    res.locals.error = req.flash("error");
    res.locals.msg = req.flash("msg");
   
    next();
});


const hotelRoutes = require('./routes/hotel');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');


app.use(hotelRoutes);
app.use(adminRoutes);
app.use(authRoutes);


app.use((req,res, next)=>{
    res.render('404');
});
app.listen(3000, ()=>{
    console.log('server is running on port 3000!');
})