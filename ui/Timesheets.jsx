import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  padding: '15px',
  margin: '15px'
};

class Timesheets extends React.Component {
  render() {
    return (
      <div>
        <Paper style={styles}>
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
          <Button>Create timesheet</Button>
        </Paper>
        <Paper style={styles}>
          Active timesheets
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Button complete</TableCell>
                <TableCell align="right">Button delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right">u</TableCell>
                <TableCell align="right">fsfg</TableCell>
                <TableCell align="right">dfg</TableCell>
                <TableCell align="right">greg</TableCell>
                <TableCell align="right">greg</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper style={styles}>
          Completed timesheets
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Button delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right">u</TableCell>
                <TableCell align="right">fsfg</TableCell>
                <TableCell align="right">dfg</TableCell>
                <TableCell align="right">
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
