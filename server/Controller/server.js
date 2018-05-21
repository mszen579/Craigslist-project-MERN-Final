//Controller/server.js

//npm
const { check, validationResult } = require('express-validator/check');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var User = require('../models/User');
var Post = require('../models/Post');

//mongoDB'
mongoose.connect('mongodb://localhost/cl');
//express
var app = express();

//middelware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'supersecretstring12345!',
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: (60000 * 30) },
}))

////////////////////USER controller

// Registeration
var register = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send({ status: 'error', errors: errors.mapped() })
    }
    User.create(req.body)
        .then(user => { return res.send({ status: 'success', message: 'registerd successfuly' }) })
        .catch(error => {
            console.log(error);
            return res.send({ status: 'error', message: error })
        })
}

app.post('/api/register', [
    check('name', 'please enter your full name').not().isEmpty(),
    check('name', 'your name must not contain any numbers').isAlpha(),
    check('jobTitle', 'please enter your Job Title').not().isEmpty(),
    check('jobTitle', 'your Job Title must not contain any numbers').isAlpha(),
    check('email', 'your email is not valid').isEmail(),
    check('email', 'email already exist').custom(
        function (value) {
            return User.findOne({ email: value }).then(user => !user)
        }),
    check('password', 'your password should be more than 5 charchters').isLength({ min: 6 }),
    check('con_password', 'your password confirmation dose not match').custom(
        (value, { req }) => value === req.body.password
    )
], register);

// Login
var login = (req, res) => {

    User.findOne({ email: req.body.email, password: req.body.password })
        .then(function (user) {
            // if user name or password is worng
            if (!user) { return res.json({ err: true, message: 'Wrong credential' }) }

            //user is found
            console.log('before cookie');
            req.session.user = user;
            console.log(req.session.user);
            req.session.save();
            res.status(200).json(user);
        })
        .catch(error => {
            console.log(error);
            return res.status(422).json({ status: 'error', message: error })
        })
}

app.post('/api/login', login);

//logout
var logout = (req, res) => {
    req.session.destroy();
    res.json({ logout: true });
};
app.get('/api/logout', logout);

//current user
var current = (req, res) => {
    if (req.session.user)
        User.findById(req.session.user._id)
            .then(user => { return user ? res.json(user) : res.status(422).json({ msg: 'The authentication failed.' }) })
            .catch(err => console.log(err));
    else
        res.status(422).json({ msg: 'The authentication failed' })
};
app.get('/api/currentuser', current)


//all users
app.get('/api/users', function (req, res, next) {
    User.find({}, ['name', 'email', 'jobTitle'], (err, users) => {
        if (err) {
            console.log("Error getting users" + err);
            return next();
        }
        res.json(users)
    })
})

//show single users
app.get('/api/user/:_id', function findOneUser(req, res, next) {
    User.findOne({ _id: req.params._id }, ['name', 'email', 'jobTitle'], (err, user) => {
        if (err) {
            console.log("Error getting the user", user);
            return next();
        }
        res.json(user);
    })
})


////////////////////post new listings////////////////////////////
//post a listing
var postLising = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send({ status: 'error', errors: errors.mapped() })
    }
    var post = new Post(req.body);
    console.log(post);
    post.user = req.session.user._id;
    console.log(post);    
    post.save()
    .then(post => {return res.send({ status: 'success', message: 'List created successfuly' }) })
        .catch(error => {
            console.log(error);
            return res.send({ status: 'error', message: error })
        })
}


app.post('/api/postlist', [
    check('title', 'Please enter the Title').not().isEmpty(),
    check('title', 'Your Title must not exceed 50 car').isLength({ max: 50 }),
    check('desc', 'Please enter listing Description').not().isEmpty(),
    check('desc', 'Your Description must not exceed 255 car').isLength({ max: 255 }),
    check('price', 'Please enter the Price').not().isEmpty(),
    check('price', 'Price should be number').isNumeric(),
    check('location', 'Please add your location').not().isEmpty(),
    check('contact', 'Please add your contact details').not().isEmpty(),
], postLising);

//show me Allposts in home page
app.get('/api/Allposts', function (req, res, next) {
    Post.find({},  (err, posts) => {
        if (err) {
            console.log("Error getting posts" + err);
            return next();
        }
        res.json(posts)
    }).populate('user').sort({ createdat: 'desc' })
})



//showing single post:
app.get("/api/post/:_id", function findOneUser(req, res, next) {
 Post.findOne({ _id: req.params._id })
 .populate('user')
 .then(user=>{res.send(user)})
 .catch(err=>res.send(err))
});


///Delete listing
app.delete('/api/deletepost/:id', function (req, res) {
    Post.findById(req.params.id)
      .then(function (post) {
        post.remove()
          .then(function () {
            res.send({ status: 'success', message: 'removed post' })
          });
      });
  });

app.listen(8000);
console.log('listening to port: 8000')