const uuid = require('uuid/v4');
const _ = require('lodash');
const { saveTimesheet,readTimesheets, completeTimesheetById, deleteTimesheetById } = require('./database.js');

const createTimesheet = async ({ name, time, description }) => {
  const id = uuid();
  const newTimesheet = { id, name, time, description, status: 'active' };
  await saveTimesheet(newTimesheet);
  return _.omit(newTimesheet, ['_id']);
};

const getTimesheets = () => readTimesheets();

const getActiveTimesheets = async () => {
  const timesheets = await getTimesheets();
  return timesheets.filter((el) => el.status === 'active');
};

const markTimesheetComplete = async ({ id }) => {
  const completedTimesheet = await completeTimesheetById(id);
  if (!completedTimesheet) {
    throw Error(`timesheet not found for id ${id}`);
  }
  return _.omit(completedTimesheet, ['_id']);
};

const deleteTimesheet = ({ id }) => deleteTimesheetById(id);

module.exports = {
  createTimesheet,
  getTimesheets,
  markTimesheetComplete,
  getActiveTimesheets,
  deleteTimesheet,
};
