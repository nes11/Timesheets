const uuid = require('uuid/v4');
const timesheets = [];

const createTimesheet = ({ time }) => {
  const id = uuid();
  timesheets.push({ id, time });
};

const getTimesheets = () => timesheets;

module.exports = {
  createTimesheet,
  getTimesheets,
};
