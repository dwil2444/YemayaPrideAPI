const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const app = require('./../server');
const {PrideEvent} = require('./../models/events');
const {User} = require('./../models/user');
const routes = require('./../routes/routes')

const { events, populateEvents, users, populateUsers } = require('./preTest')

beforeEach(populateUsers);
beforeEach(populateEvents);

describe('POST /user', () => {
  it('Should create a user', (done) => {
    //GIVEN a user provides a unique email address and password
    var email = 'test@testEmail.com';
    var password = 'password';
    request(app)
      .post('/api/signup')
      .send({email, password})
      .expect(302)    // page is redirected
      .expect((res) => {
        //THEN a valid auth token should be returned
        expect(res).toBeTruthy()
      })
      .end((err) => {
        if(err) {
          return done(err);
        }
        User.findOne({email}).then((doc) => {
          //AND when a search for the user's email is conducted
          expect(doc).toBeTruthy();
          //THEN the password saved in the database should be hashed
          expect(doc.password).not.toBe(password);
          done();
        }).catch((e) => done(e));
      })
  });
})

describe('POST /PrideEvent', () => {
  it('Should create an event', (done) => {
    //Given a user provides a request with an event name and a valid auth token
    var name = 'Petersburg Pride Parade';
    request(app)
      .post('/api/PrideEvent')
      .set('x-auth', users[0].tokens[0].token)
      .send({name})
      //THEN the response should contain the event name
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        //AND WHEN a search of the database is conducted
        PrideEvent.find({name}).then((events) => {
          expect(events.length).toBe(1);
        // THEN the event is found
          expect(events[0].name).toBe(name);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /PrideEvent', () => {
  it('Should return a list of all events', (done) => {
    //GIVEN a user with a valid token makes a request for a list of all events
    request(app)
      .get('/api/PrideEvent')
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
    //THEN all the events in the database are returned
        expect(res.body.prideEvent.length).toBe(2)
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        done();
      })
  });
});
