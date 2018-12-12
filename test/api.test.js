const expect = require('chai').expect;
const axios = require('axios');

const { app } = require('../routes.js');
const assert = require('assert');

//const timesheet = require('./index.js')
let server;

describe('sending a GET req to /', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });
  it('should respond with status 200 and a body => array', () => {
    return axios.get('http://localhost:4001/')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
      });
  });
});

describe('sending a POST req to /createTimesheet', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });
  it('should create a timesheet, respond with that timesheet, and / should respond correctly', () => {
    const postBody = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };
    return axios.post('http://localhost:4001/createTimesheet', postBody)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('object');
        expect(res.data).to.have.keys('id', 'name', 'time', 'description', 'status');
        return axios.get('http://localhost:4001/')
          .then((res) => {
            res.data.forEach((timesheet) =>{
              expect(timesheet).to.be.an('object');
              expect(timesheet).to.have.keys('id', 'name', 'time', 'description', 'status');
            });
          });
      });
  });
});
