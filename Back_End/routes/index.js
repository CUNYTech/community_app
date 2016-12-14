var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/userSchema");
var Question = require("../models/questionSchema");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/communitydb')

// api routes //
/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Express' });
});

// Log user in, assume app is already connected to the database
router.put('/addQuestion', addQuestion);
router.get('/deleteQuestion', deleteQuestion);
router.get('/viewQuestion', viewQuestion);
router.put('/register', register);
router.put('/login', login);
router.get('/vote', vote);

function addQuestion(req, res){
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
}

function deleteQuestion(req, res){
  res.render('index', { title: 'FUTURE DELETE QUESTION '});
  console.log('Delete question...nothing here yet');
}

function viewQuestion(req, res){
  Question.find({}, function(err, Question) {
    var questionMap = {};

    Question.forEach(function(Question) {
      questionMap[Question.id] = Question;
    });

    res.send(questionMap);
  });
}

function viewUserQuestions(req, res) {
  User
    .findOne({ '_id': req.body._id })
    .populate('questions')
    .exec(function (err, User){
      if(err) return handleError(err);
    });
    res.send(User.questions);
}


function register(req, res){
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
}

function vote(req, res) {
  console.log('test');
  //Take req body and update vote count
  // find by username for now (will use _id later)
  if(req.body.option === '1'){
    Question.update({ _id: '58363b648eac0631dc2c12df'}, {$inc: {votesA : 1}} )
  } else {
    Question.update({ _id: '58363b648eac0631dc2c12df'}, {$inc: {votesB : 1}} )
  }
}

function login(req, res){
  User.findOne({ "username" : req.body.username }, function(err, test){
    if(JSON.parse(JSON.stringify(test.password).replace(/"\s+|\s+"/g,'"')) != req.body.password){
      return res.send();
      res.json({
        "status" : "fail",
        "Message" : "Incorrect password."
      });
    }
    else{
      res.json({
        "SUCCESS" : test
      });
    }
  });
}

module.exports = router;
