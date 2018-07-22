const express = require('express');
const routes = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose');
var {PrideEvent} = require('./../models/events');
var {User} = require('./../models/user');
var authentication = require('./../middleware/authentication');

routes.use(bodyParser.json());

routes.post('/user', (req, res) => {
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

routes.get('/PrideEvent', authentication, (req, res) => {
  PrideEvent.find().then((prideEvent) => {
    res.send({prideEvent})
  }, (e) => {
    res.status(400).send(e);
  });
});

routes.post('/PrideEvent', authentication, (req, res) =>{
  var event = new PrideEvent({
    name: req.body.name
  });
  event.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

module.exports = routes;
