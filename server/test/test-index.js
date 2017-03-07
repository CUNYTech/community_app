var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect();
var should = chai.should();
var server = require('../app');

chai.use(chaiHttp);

describe('/PUT register', function(done) {
  it('should fail to register a new user on /register PUT as username is already used', function(done) {
    chai.request(server)
      .put('/register')
      .send({"username": "sampleName", "password": "temp", "email": "test@mail.com"})
      .end(function(err, res) {
        console.log(res.body)
        res.should.be.json;
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});


describe('/PUT login', function(done) {
  it('should login a user on /login POST', function(done) {
    chai.request(server)
      .put('/login')
      .send({"username": "sampleName", "password": "temp"})
      .end(function(err, res) {
        console.log(res.body)
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
});


describe('/PUT login', function(done) {
  it('should fail to login user on /login POST because of username', function(done) {
    chai.request(server)
      .put('/login')
      .send({"username": "notInDB", "password": "temp"})
      .end(function(err, res) {
        console.log(res.body)
        res.should.be.json;
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
    });
});


describe('/PUT login', function(done) {
  it('should fail to login user on /login POST because of password', function(done) {
    chai.request(server)
      .put('/login')
      .send({"username": "sampleUser", "password": "notTemp"})
      .end(function(err, res) {
        console.log(res.body)
        res.should.be.json;
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
    });
});

describe('/PUT question', function(done) {
  it('should register a question associated with a user on /question', function(done) {
    chai.request(server)
      .put('/question')
      .send({"username" : "sampleName", "description" : "(Y/N)?",
            "optionA" : "Y", "optionB" : "N"})
      .end(function(err, res) {
        console.log(res.body)
        res.should.be.json;
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
