// includes server and app
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var User = require('./models/userSchema');
var Question = require('./models/questionSchema');

var app = express();
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/communitydb');

var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
//=============================================================
var router = express.Router();

router.get('/', function(req, res){
  res.json({ message: 'connected'});
});

// ROUTE FUNCTIONS FOR OUR API
//=============================================================
// routes for users functions ending in '/users'
router.route('/users')
  // user register
  .post(function(req, res){
    if(!User.findOne({ "username" : req.body.username })){
    res.json({
      "status" : "fail",
      "Message" : "Username already taken"
    });
    }
    // check if email is unique
    if(!User.findOne({ "email" : req.body.email })){
      res.json({
        "status" : "fail",
        "Message" : "Email already taken"
      });
    }

    var newUser = new User({
      "username" : JSON.parse(JSON.stringify(req.body.username).replace(/"\s+|\s+"/g,'"')),
      "password" : JSON.parse(JSON.stringify(req.body.password).replace(/"\s+|\s+"/g,'"')),
      "email" : JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"')),
      "admin" : false
    });

    newUser.save(function(err){
      if(err){
        console.log('Error adding user to database');
        return res.send();
        res.json({ "status": "fail", "ERROR": err });
      }else
        res.json({ "SUCCESS": newUser });
    });
  })

  /* user login - gets every user
  .get(function(req, res){
    User.find(function(err, user){
      if(err)
        res.send(err);

      res.json(user);
    })
  });*/

router.route('/users/:user_id')
  // user login based on user_id
  .get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if(err)
        res.send(err);
      res.json(user);
    });
  });

// end of user functions
//=============================================================

// routes for questions functions ending in '/questions'
router.route('/questions')
  // add questions
  .post(function(req,res){
    if(!req.body){
      return res.json({
        "status" : "fail",
        "data" : "No data sent"
      });
    }

    User.findOne({ "username" : req.body.username }, function(err, test){
      /*return res.json({
        "status" : "fail",
        "data" : { "username" : "User not found" }
      });*/

      var newq = new Question({
        "creator" : test._id,
        "description" : req.body.question,
        //"category" : JSON.parse(JSON.stringify(req.body.category).replace(/"\s+|\s+"/g,'"')),
        "status" : "Open",
        "optionA" : req.body.OptionA,
        "optionB" : req.body.OptionB,
      });

      newq.save(function(err){
        if(err){
          console.log('Error saving question');
          return res.send();
          res.json({ "status": "fail", "ERROR": err });
        }else
          res.json({ "SUCCESS": newq });
      });
    });
  })

  // view questions
  .get(function(req, res){
    Question.find(function(err, questions){
      if (err)
        res.send(err);

      res.json(questions);
    });
  })

// end of question functions
//=============================================================

// all routes will have prefix '/api'
app.use('/api', router);

// EXTRA FUNCTIONS 
//=============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler will print stacktrace
if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// STARTS SERVER
//=============================================================
app.listen(port, ()=> { 
  console.log('Express server listening on port ' + port); 
})

module.exports = app;
