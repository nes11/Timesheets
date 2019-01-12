import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class CreateTimesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      time: ''
    };
  }

  createTimesheet() {
    const timesheet = this.state;
    axios.post('/createTimesheet', timesheet)
      .then(() => this.props.loadTimesheets());
  }

  render() {
    return (
      <div>
        <TextField
          style={{ margin: '10px' }}
          id="name"
          label="Name"
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
          margin='normal'
          variant="outlined"
        />
        <TextField
          style={{ margin: '10px' }}
          id="description"
          label="Description"
          value={this.state.description}
          onChange={(event) => this.setState({ description: event.target.value })}
          margin='normal'
          variant="outlined"
        />
        <TextField
          style={{ margin: '10px' }}
          id="datetime-local"
          label="Time & Date"
          type="datetime-local"
          value={this.state.time}
          onChange={(event) => this.setState({ time: event.target.value })}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 900 }}
        />
        <Button
          variant="outlined"
          style={{ margin: '10px' }}
          onClick={() => this.createTimesheet()}
        >
          Create timesheet
        </Button>
      </div>
    );
  }
}

export default CreateTimesheet;
