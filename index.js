const express = require('express');
const bodyParser = require('body-parser');
const { createTimesheet, getTimesheets, markTimesheetComplete } = require('./timesheets');
const bcrypt = require('bcryptjs');


const isValidDate = (date) => !isNaN(date);

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(getTimesheets());
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
    res.send(`Timesheet was not created, ${req.body.time} is not a valid time.`)
  }
});

app.post('/markTimesheetComplete/:id', (req, res) => {
  const hash = '$2a$12$Yk.Bosx2iIrt2pQp3pzBCuPPt25IsPiq/w.2uPS4n7T4QPRxR.vYC';
  if (bcrypt.compareSync(req.body.password, hash)) {
    try {
      const id = req.params.id;
      const completedTimesheet = markTimesheetComplete({ id });
      res.send(completedTimesheet);
    } catch(err) {
      console.log(err.message)
      res.status(400).send({ error: err.message })
    }
  } else {
    res.status(401).send({ error: 'incorrect password' })
    console.log('incorrect password');
  }
});


app.listen(4000, () => {
  console.log('listening on port 4000');
});
