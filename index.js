const express = require('express');
const bodyParser = require('body-parser');
const { createTimesheet, getTimesheets } = require('./timesheets');

const isValidDate = (date) => !isNaN(date);

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(getTimesheets());
});

app.post('/createTimesheet', (req, res) => {
  const time = new Date(req.body.time);
  console.log(time)
  if (isValidDate(time)) {
    createTimesheet({ time });
    res.send(`timesheet created with time ${time}`);
  } else {
    res.send(`Timesheet was not created, ${req.body.time} is not a valid time.`)
  }
});


app.listen(4000, () => {
  console.log('listening on port 4000');
});
