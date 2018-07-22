const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {PrideEvent} = require('./../models/events');
const {User} = require('./../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users =[{
  _id: userOneId,
  email: 'd@example.com',
  password: 'usepass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'j@example.com',
  password: 'used2pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const events = [{
  _id: new ObjectID(),
  name: 'Hampton Pride',
  _creator: userOneId
}, {
  _id: new ObjectID(),
    name: 'Norfolk Pride',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]).then(() => {
    }).then(() => done());
  });
};

const populateEvents = (done) => {
  PrideEvent.remove({}).then(() => {
    return PrideEvent.insertMany(events);
  }).then(() => done())
};

module.exports = { events, populateEvents, users, populateUsers };
