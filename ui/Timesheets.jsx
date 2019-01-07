import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
          <ActiveTimesheets timesheets={ this.state.timesheets } />
        </Paper>
        <Paper style={styles}>
          <CompletedTimesheets completedTimesheets={ this.state.timesheets } />
        </Paper>
      </div>
    );
  }
}
// value={this.state.name}
// onChange={this.handleChange('name')}
export default Timesheets;
