require('./config/config.js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {PrideEvent} = require('./models/events');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authentication');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/user', (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/PrideEvent', authenticate, (req, res) => {
  PrideEvent.find().then((prideEvent) => {
    res.send({prideEvent})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/PrideEvent', (req, res) =>{
  var event = new PrideEvent({
    name: req.body.name
  });
  event.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = {app};
