import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CreateTimesheet from './CreateTimesheet.jsx';
import ActiveTimesheets from './ActiveTimesheets.jsx';
import CompletedTimesheets from './CompletedTimesheets.jsx';

const styles = {
  padding: '15px',
  margin: '15px'
};

class Timesheets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheets: []
    };
    this.loadTimesheets();
  }

  loadTimesheets () {
    axios.get('/').then(result => {
      this.setState({ timesheets: result.data });
    });
  }

  render() {
    return (
      <div>
        My Timesheet App
        <Paper style={styles}>
          <CreateTimesheet loadTimesheets={() => this.loadTimesheets()}/>
        </Paper>
        <Paper style={styles}>
          <ActiveTimesheets 
            timesheets={ this.state.timesheets } 
            loadTimesheets={() => this.loadTimesheets()} 
          />
        </Paper>
        <Paper style={styles}>
          <CompletedTimesheets 
            timesheets={ this.state.timesheets } 
            loadTimesheets={() => this.loadTimesheets()}
          />
        </Paper>
      </div>
    );
  }
}
// value={this.state.name}
// onChange={this.handleChange('name')}
export default Timesheets;
