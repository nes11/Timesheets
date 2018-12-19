const express = require('express');
const bodyParser = require('body-parser');
const { createTimesheet, getTimesheets, markTimesheetComplete, getActiveTimesheets, deleteTimesheet } = require('./timesheets');
const bcrypt = require('bcryptjs');


const isValidDate = (date) => !isNaN(date);
const hash = '$2a$12$Yk.Bosx2iIrt2pQp3pzBCuPPt25IsPiq/w.2uPS4n7T4QPRxR.vYC';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(getTimesheets());
});

app.get('/activeTimesheets', (req, res) => {
  res.send(getActiveTimesheets());
});

app.post('/createTimesheet', (req, res) => {
  const time = new Date(req.body.time);
  if (isValidDate(time)) {
    const newTimesheet = createTimesheet({
      name: req.body.name,
      time,
      description: req.body.description,
    });
    res.send(newTimesheet);
  } else {
    res.send(`Timesheet was not created, ${req.body.time} is not a valid time.`);
  }
});

app.post('/markTimesheetComplete/:id', (req, res) => {
  try {
    if (!bcrypt.compareSync(req.body.password, hash)) {
      throw Error('incorrect password');
    }
    const id = req.params.id;
    const completedTimesheet = markTimesheetComplete({ id });
    res.send(completedTimesheet);
  } catch(err) {
    const status = err.message === 'incorrect password' ? 401 : 400;
    console.log(err.message);
    res.status(status).send({ error: err.message });
  }
});

app.post('/deleteTimesheet/:id', (req, res) => {
  const id = req.params.id;
  const updatedListOfTimesheets = deleteTimesheet({ id });
  res.send(`Timesheet ${id} has been deleted`);
});

module.exports = {
  app,
};
