import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class CreateTimesheet extends React.Component {
  
  createTimesheet() {
    const timesheet = {
      name: 'Lesson 3',
      time: '2018-12-13T18:30:00',
      description: 'blah, blah'
    };
    axios.post('/createTimesheet', timesheet).then(() => this.props.loadActiveTimesheets());
  }

  render() {
    return (
      <div>
        <TextField
          style={{ margin: '10px' }}
          id="name"
          label="Name"
          margin='normal'
          variant="outlined"
        />
        <TextField
          style={{ margin: '10px' }}
          id="description"
          label="Description"
          margin='normal'
          variant="outlined"
        />
        <TextField
          style={{ margin: '10px' }}
          id="date"
          label="Date"
          margin='normal'
          type="date"
          defaultValue="2019-01-01"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={{ margin: '10px' }}
          id="time"
          label="Time"
          margin='normal'
          type="time"
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300
          }}
        />
        <Button 
          variant="outlined" 
          onClick={() => this.createTimesheet()}>
          Create timesheet
        </Button>
      </div>
    );
  }
}

export default CreateTimesheet;
