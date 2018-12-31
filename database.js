const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';

const saveTimesheet = async (timesheet) => {
  try {
    const client = await MongoClient.connect(url);
    const result = await client
      .db('myTimesheetDatabase')
      .collection('myTimesheetCollection')
      .insertOne(timesheet);
    client.close();
  } catch(err) {
    console.log('error', err);
  }
};

const readTimesheets = async () => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('myTimesheetDatabase');
    const myTimesheetCollection = db.collection('myTimesheetCollection');
    const result = await myTimesheetCollection.find({}).project({_id:0}).toArray();
    client.close();
    return result;
  } catch(err) {
    console.log('error', err);
  }
};

const completeTimesheetById = async (timesheetId) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('myTimesheetDatabase');
    const myTimesheetCollection = db.collection('myTimesheetCollection');
    const result = await myTimesheetCollection.findOneAndUpdate({ id: timesheetId }, { $set: { status: 'completed' } }, {returnOriginal: false});
    client.close();
    return result.value;
  } catch(err) {
    console.log('error', err);
  }
};

const deleteTimesheetById = async (timesheetId) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('myTimesheetDatabase');
    const myTimesheetCollection = db.collection('myTimesheetCollection');
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
