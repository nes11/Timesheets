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

  it('should respond with status 200 and a body => array', async () => {
    const res = await axios.get('http://localhost:4001/');
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('array');
  });
});

describe('sending a POST req to /createTimesheet', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });

  it('should create a timesheet, respond with that timesheet, and / should respond correctly', async () => {
    const postBody = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };
    const res = await axios.post('http://localhost:4001/createTimesheet', postBody);
    expect(res.data).to.be.an('object');
    expect(res.data).to.have.keys('id', 'name', 'time', 'description', 'status');
    expect(res.data.status).to.equal('active');
    expect(res.data.name).to.equal(postBody.name);
    expect(Date(res.data.time)).to.equal(Date(postBody.time));
    expect(res.data.description).to.equal(postBody.description);

    const res2 = await axios.get('http://localhost:4001/');
    res2.data.forEach((timesheet) => {
      expect(timesheet).to.be.an('object');
      expect(timesheet).to.have.keys('id', 'name', 'time', 'description', 'status');
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

  it('should change the status of the ID`d timesheet to completed', async () => {
    const res = await axios.post('http://localhost:4001/createTimesheet', postBody);

    const password = { password: 'ham sandwich' };
    const res2 = await axios.post(`http://localhost:4001/markTimesheetComplete/${res.data.id}`, password);
    expect(res2.status).to.equal(200);
    expect(res2.data).to.be.an('object');
    expect(res2.data).to.have.keys('id', 'name', 'time', 'description', 'status');
    expect(res2.data.status).to.equal('completed');
  });

  it('should return an error400 and a still active timesheet when given wrong ID', async () => {
    const res1 = await axios.post('http://localhost:4001/createTimesheet', postBody);
    const createdTimesheetId = res1.data.id;

    const password = { password: 'ham sandwich' };
    const res2 = await axios.post('http://localhost:4001/markTimesheetComplete/invalidId', password, { validateStatus: false });
    expect(res2.status).to.equal(400);
    expect(res2.data.error).to.equal('timesheet not found for id invalidId');

    const res3 = await axios.get('http://localhost:4001/');
    const timesheet = res3.data.find((element) => element.id === createdTimesheetId);
    expect(timesheet.status).to.equal('active');
  });

  it('should return an error401 and a still active timesheet when given wrong password', async () => {
    const res1 = await axios.post('http://localhost:4001/createTimesheet', postBody);
    const createdTimesheetId = res1.data.id;

    const password = { password: 'cheese sandwich' };
    const res2 = await axios.post(`http://localhost:4001/markTimesheetComplete/${createdTimesheetId}`, password, { validateStatus: false });
    expect(res2.status).to.equal(401);
    expect(res2.data.error).to.equal('incorrect password');

    const res3 = await axios.get('http://localhost:4001/');
    const timesheet = res3.data.find((element) => element.id === createdTimesheetId);
    expect(timesheet.status).to.equal('active');
  });

});


describe('sending a GET req to /activeTimesheets', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });

  it('should respond with the list of active timesheets only', async () => {
    const password = { password: 'ham sandwich' };
    const postBody = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };

    const res1 = await axios.post('http://localhost:4001/createTimesheet', postBody);
    const createdTimesheetId1 = res1.data.id;

    const res2 = await axios.post('http://localhost:4001/createTimesheet', postBody);
    const createdTimesheetId2 = res2.data.id;

    await axios.post(`http://localhost:4001/markTimesheetComplete/${createdTimesheetId1}`, password);

    const res4 = await axios.get('http://localhost:4001/activeTimesheets');
    const timesheet1 = res4.data.find((element) => element.id === createdTimesheetId1);
    const timesheet2 = res4.data.find((element) => element.id === createdTimesheetId2);
    expect(timesheet1).to.equal(undefined);
    expect(timesheet2.status).to.equal('active');
  });

});

describe('sending a POST req to /deleteTimesheet/:id', () => {
  before((done) => {
    server = app.listen(4001, done);
  });
  after(() => {
    server.close();
  });
  it('should delete the ID`d timesheet', async () => {
    const postBody = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };

    const res1 = await axios.post('http://localhost:4001/createTimesheet', postBody);
    const createdTimesheetId1 = res1.data.id;

    await axios.post(`http://localhost:4001/deleteTimesheet/${createdTimesheetId1}`);

    const res2 = await axios.get('http://localhost:4001/');
    const listOfTimesheets = res2.data;

    const deleted = listOfTimesheets.find((el) => el.id === createdTimesheetId1);
    expect(deleted).to.equal(undefined);
  });
});
