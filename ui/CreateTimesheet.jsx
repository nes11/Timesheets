import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class CreateTimesheet extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  createTimesheet() {
    const timesheet = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };
    axios.post('/createTimesheet', timesheet).then(() => this.props.loadTimesheets());
  }

  render() {
    return (
      <div>
        <TextField
          id="name"
          label="Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="date"
          label="Date"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="time"
          label="Time"
          margin="normal"
          variant="outlined"
        />
        <Button onClick={() => this.createTimesheet()}>
          Create timesheet
        </Button>
      </div>
    );
  }
}

export default CreateTimesheet;
