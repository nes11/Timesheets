const uuid = require('uuid/v4');
const timesheetSaver = require('./timesheet-saver.js');
const timesheets = [];

const createTimesheet = ({ name, time, description }) => {
  const existingTimesheets = timesheetSaver.readJson();
  const id = uuid();
  const newTimesheet = { id, name, time, description, status: 'active' };
  const updatedTimesheets = existingTimesheets.concat(newTimesheet);
  timesheetSaver.saveJson(updatedTimesheets);
  return newTimesheet;
};

const getTimesheets = () => timesheetSaver.readJson();

//change this to new system timesheetSaver
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
