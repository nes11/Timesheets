import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ActiveTimesheets = ({ timesheets }) => (
  <div>
    Active timesheets
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Button complete</TableCell>
          <TableCell>Button delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timesheets.map(timesheet => (
          <TableRow key={ timesheet.id }>
            <TableCell>{timesheet.name}</TableCell>
            <TableCell>{timesheet.description}</TableCell>
            <TableCell>{timesheet.time}</TableCell>
            <TableCell>greg</TableCell>
            <TableCell>greg</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default ActiveTimesheets;
