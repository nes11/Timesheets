const uuid = require('uuid/v4');
const timesheetSaver = require('./timesheet-saver.js');

const createTimesheet = ({ name, time, description }) => {
  const existingTimesheets = getTimesheets();
  const id = uuid();
  const newTimesheet = { id, name, time, description, status: 'active' };
  const updatedTimesheets = existingTimesheets.concat(newTimesheet);
  timesheetSaver.saveJson(updatedTimesheets);
  return newTimesheet;
};

const getTimesheets = () => timesheetSaver.readJson();

const getActiveTimesheets = () => getTimesheets().filter((el) => el.status === 'active');

const markTimesheetComplete = ({ id }) => {
  const existingTimesheets = getTimesheets();
  const completedTimesheet = existingTimesheets.find(obj => obj.id === id);
  if (!completedTimesheet) {
    throw Error(`timesheet not found for id ${id}`);
  }
  completedTimesheet.status = 'completed';
  timesheetSaver.saveJson(existingTimesheets);
  return completedTimesheet;
};

module.exports = {
  createTimesheet,
  getTimesheets,
  markTimesheetComplete,
  getActiveTimesheets,
};
