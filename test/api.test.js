const expect = require('chai').expect;
const axios = require('axios');

const { app } = require('../routes.js');

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
        expect(res.data).to.be.an('object');
        expect(res.data).to.have.keys('id', 'name', 'time', 'description', 'status');
        expect(res.data.status).to.equal('active');
        expect(res.data.name).to.equal(postBody.name);
        expect(Date(res.data.time)).to.equal(Date(postBody.time));
        expect(res.data.description).to.equal(postBody.description);
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

describe('sending a POST req to /markTimesheetComplete/:id', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });
  const postBody = {
    name: 'Lesson 3',
    time: '2018-12-13T18:30:00',
    description: 'blah, blah'
  };

  it('should change the status of the ID`d timesheet to completed', () => {
    return axios.post('http://localhost:4001/createTimesheet', postBody)
      .then(res => {
        const password = {
          password: 'ham sandwich'
        };
        return axios.post(`http://localhost:4001/markTimesheetComplete/${res.data.id}`, password)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.data).to.be.an('object');
            expect(res.data).to.have.keys('id', 'name', 'time', 'description', 'status');
            expect(res.data.status).to.equal('completed');
          });
      });
  });

  it('should return an error400 and a still active timesheet when given wrong ID', () => {
    return axios.post('http://localhost:4001/createTimesheet', postBody)
      .then((res1) => {
        const createdTimesheetId = res1.data.id;
        const password = {
          password: 'ham sandwich'
        };
        return axios.post('http://localhost:4001/markTimesheetComplete/invalidId', password, { validateStatus: false })
          .then((res2) => {
            expect(res2.status).to.equal(400);
            expect(res2.data.error).to.equal('timesheet not found for id invalidId');
            return axios.get('http://localhost:4001/')
              .then((res) => {
                const timesheet = res.data.find((element) => element.id === createdTimesheetId);
                expect(timesheet.status).to.equal('active');
              });
          });
      });
  });

  it('should return an error401 and a still active timesheet when given wrong password', () => {
    return axios.post('http://localhost:4001/createTimesheet', postBody)
      .then(res1 => {
        const createdTimesheetId = res1.data.id;
        const password = {
          password: 'cheese sandwich'
        };
        return axios.post(`http://localhost:4001/markTimesheetComplete/${createdTimesheetId}`, password, { validateStatus: false })
          .then((res2) => {
            expect(res2.status).to.equal(401);
            expect(res2.data.error).to.equal('incorrect password');
            return axios.get('http://localhost:4001/')
              .then((res) => {
                const timesheet = res.data.find((element) => element.id === createdTimesheetId);
                expect(timesheet.status).to.equal('active');
              });
          });
      });
  });

});
