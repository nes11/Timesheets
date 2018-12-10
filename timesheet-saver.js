const fs = require('fs');
const path = require('path');
const timesheetFileName = 'timesheets-data.json';

const saveJson = (json) => {
  const data = JSON.stringify(json);
  fs.writeFileSync(path.join(__dirname, timesheetFileName), data);
};

const readJson = () => {
  const data = fs.readFileSync(path.join(__dirname, timesheetFileName));
  return JSON.parse(data);
};

module.exports = {
  saveJson,
  readJson,
};
