import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import ActiveTimesheets from './ActiveTimesheets.jsx';
import CreateTimesheet from './CreateTimesheet.jsx';

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
        <Paper style={styles}>
          <CreateTimesheet loadTimesheets={() => this.loadTimesheets()}/>
        </Paper>
        <Paper style={styles}>
          <ActiveTimesheets timesheets={ this.state.timesheets } />
        </Paper>
        <Paper style={styles}>
          Completed timesheets
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Button delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell>u</TableCell>
                <TableCell>fsfg</TableCell>
                <TableCell>dfg</TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
// value={this.state.name}
// onChange={this.handleChange('name')}
export default Timesheets;
