import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CreateTimesheet from './CreateTimesheet.jsx';
import ActiveTimesheets from './ActiveTimesheets.jsx';
import CompletedTimesheets from './CompletedTimesheets.jsx';

const styles = {
  padding: '15px',
  margin: '15px',
  backgroundColor: 'hsla(210, 93%, 95%, 1)'
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
        <Typography 
          variant="h5" 
          align="center" 
          style={ {
            color: 'hsla(204, 64%, 40%,1)', 
            fontSize: 30, 
            fontWeight:'bold'
          } }>
          My Timesheet App        
        </Typography>
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

export default Timesheets;
