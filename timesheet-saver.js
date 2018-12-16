const fs = require('fs');
const path = require('path');
const timesheetFileName = 'timesheets-data.json';

const saveJson = (json) => {
  const data = JSON.stringify(json, null, 2);
  fs.writeFileSync(path.join(__dirname, timesheetFileName), data);
};

const readJson = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, timesheetFileName));
    return JSON.parse(data);
  } catch (error) {
    saveJson([]);
    const data = fs.readFileSync(path.join(__dirname, timesheetFileName));
    return JSON.parse(data);
  }
};

module.exports = {
  saveJson,
  readJson,
};
