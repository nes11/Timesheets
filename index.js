const express = require('express');
const bodyParser = require('body-parser');
const { createTimesheet, getTimesheets, markTimesheetComplete } = require('./timesheets');

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
  try {
    const id = req.params.id;
    const completedTimesheet = markTimesheetComplete({ id });
    res.send(completedTimesheet);
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ error: err.message })
  }
});


app.listen(4000, () => {
  console.log('listening on port 4000');
});
