var env = process.env.NODE_ENV || 'development';
if(env === 'development' || env === 'test')
{
  var mailAuth = require('./mailAuth.json')
  var mailConfig = mailAuth[env];
  Object.keys(mailConfig).forEach((key) => {
    process.env[key] = mailConfig[key];
  });
}

const express = require('express');
const routes = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose');
var {PrideEvent} = require('./../models/events');
var {User} = require('./../models/user');
var authentication = require('./../middleware/authentication');

routes.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.post('/signup', urlencodedParser, async (req, res) => {
  try {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);
    user = await user.save();
    let token = await user.generateAuthToken();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.authUser}`,
        pass: `${process.env.authPass}`
      },
      tls: { rejectUnauthorized: false }
    });
    var mailOptions = {
      from: `${process.env.authUser}`,
      to: `${user.email}`,
      subject: 'Thank you for signing up to use our API',
      text: `Here is your registered API key: ${token}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    res.send(token);
    //console.log(res);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

routes.get('/PrideEvent', authentication, async(req, res) => {
  try {
    let prideEvent = await PrideEvent.find();
    res.send({prideEvent});
  }
  catch (e) {
    res.status(400).send(e);
  }
});

routes.post('/PrideEvent', authentication, async (req, res) => {
  try {
    var event = new PrideEvent({
      name: req.body.name
    });
    let doc = await event.save();
    res.status(200).send(doc);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

module.exports = routes;
