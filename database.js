const { MongoClient } = require('mongodb');
const localUrl = 'mongodb://localhost:27017';
const prodUrl = 'mongodb://mongo:27017';

const dbName = 'agnes-timesheets';
const timesheetCollection = 'timesheets';

const getConnection = async () => {
  const user = process.env['MONGO_USERNAME'];
  const password = process.env['MONGO_PASSWORD'];
  if (!user || !password) {
    return MongoClient.connect(localUrl);
  } else {
    return MongoClient.connect(prodUrl, { auth: { user, password } });
  }
};

const saveTimesheet = async (timesheet) => {
  try {
    const client = await getConnection();
    await client
      .db(dbName)
      .collection(timesheetCollection)
      .insertOne(timesheet);
    client.close();
  } catch(err) {
    console.log('error', err);
  }
};

const readTimesheets = async () => {
  try {
    const client = await getConnection();
    const db = client.db(dbName);
    const myTimesheetCollection = db.collection(timesheetCollection);
    const result = await myTimesheetCollection.find({}).project({_id:0}).toArray();
    client.close();
    return result;
  } catch(err) {
    console.log('error', err);
  }
};

const completeTimesheetById = async (timesheetId) => {
  try {
    const client = await getConnection();
    const db = client.db(dbName);
    const myTimesheetCollection = db.collection(timesheetCollection);
    const result = await myTimesheetCollection.findOneAndUpdate(
      { id: timesheetId },
      { $set: { status: 'completed' } },
      { returnOriginal: false }
    );
    client.close();
    return result.value;
  } catch(err) {
    console.log('error', err);
  }
};

const deleteTimesheetById = async (timesheetId) => {
  try {
    const client = await getConnection();
    const db = client.db(dbName);
    const myTimesheetCollection = db.collection(timesheetCollection);
    await myTimesheetCollection.deleteOne({ id: timesheetId });
    client.close();
  } catch(err) {
    console.log('error', err);
  }
};

module.exports = {
  saveTimesheet,
  readTimesheets,
  completeTimesheetById,
  deleteTimesheetById,
};
