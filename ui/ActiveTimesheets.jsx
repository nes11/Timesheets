import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ActiveTimesheets = ({ timesheets, loadTimesheets }) => {
  const markTimesheetComplete = (timesheetId) => {
    axios.post(`/markTimesheetComplete/${timesheetId}`, { password: 'ham sandwich' })
      .then(() => loadTimesheets());
  };
  
  return (
    <div>
      Active timesheets
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timesheets
            .filter((el) => el.status === 'active')
            .map(timesheet => (
              <TableRow key={timesheet.id}>
                <TableCell>{timesheet.name}</TableCell>
                <TableCell>{timesheet.description}</TableCell>
                <TableCell>{timesheet.time}</TableCell>
                <TableCell>time</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => markTimesheetComplete(timesheet.id)}
                  >
                    Completed
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveTimesheets;
