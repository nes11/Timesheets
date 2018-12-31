const uuid = require('uuid/v4');
const _ = require('lodash');
const timesheetSaver = require('./timesheet-saver.js');
const { saveTimesheet,readTimesheets, completeTimesheetById, deleteTimesheetById } = require('./database.js');


// const createTimesheet = ({ name, time, description }) => {
//   const existingTimesheets = getTimesheets();
//   const id = uuid();
//   const newTimesheet = { id, name, time, description, status: 'active' };
//   const updatedTimesheets = existingTimesheets.concat(newTimesheet);
//   timesheetSaver.saveJson(updatedTimesheets);
//   return newTimesheet;
// };

const createTimesheet = async ({ name, time, description }) => {
  const id = uuid();
  const newTimesheet = { id, name, time, description, status: 'active' };
  await saveTimesheet(newTimesheet);
  return _.omit(newTimesheet, ['_id']);
};

//const getTimesheets = () => timesheetSaver.readJson();
const getTimesheets = async () => await readTimesheets();

const getActiveTimesheets = async () => await getTimesheets()
  .then(timesheets => timesheets.filter((el) => el.status === 'active'));

const markTimesheetComplete = async ({ id }) => {
  const completedTimesheet = await completeTimesheetById(id);
  if (!completedTimesheet) {
    throw Error(`timesheet not found for id ${id}`);
  }
  return _.omit(completedTimesheet, ['_id']);
};

const deleteTimesheet = async ({ id }) => {
  await deleteTimesheetById(id);
};

module.exports = {
  createTimesheet,
  getTimesheets,
  markTimesheetComplete,
  getActiveTimesheets,
  deleteTimesheet,
};
