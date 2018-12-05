const uuid = require('uuid/v4');
const timesheets = [];

const createTimesheet = ({ name, time, description }) => {
  const id = uuid();
  const newTimesheet = { id, name, time, description, status: 'active' };
  timesheets.push(newTimesheet);
  return newTimesheet;
};

const getTimesheets = () => timesheets;

const markTimesheetComplete = ({ id }) => {
  const completedTimesheet = timesheets.find(obj => obj.id === id);
  if (!completedTimesheet) {
    throw Error(`timesheet not found for id ${id}`);
  }
  completedTimesheet.status = 'completed';
  return completedTimesheet;
};

module.exports = {
  createTimesheet,
  getTimesheets,
  markTimesheetComplete,
};
