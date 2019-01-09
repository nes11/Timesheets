import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import moment from 'moment';
import FormDialog from './Dialog.jsx'; 

const ActiveTimesheets = ({ timesheets, loadTimesheets }) => {
  const markTimesheetComplete = (timesheetId, password) => {
    axios.post(`/markTimesheetComplete/${timesheetId}`, { password })
      .then(() => loadTimesheets());
  };

  const deleteTimesheets = (timesheetId, password) => {
    axios.post(`/deleteTimesheet/${timesheetId}`, { password })
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
                <TableCell>{moment(timesheet.time).format('dddd, DD MMM YYYY - HH:mm')}</TableCell>
                <TableCell>
                  <FormDialog
                    label={'Completed'}
                    timesheetId={timesheet.id} 
                    loadTimesheets={loadTimesheets}
                    zhuLiDoTheThing={markTimesheetComplete}
                  />
                </TableCell>
                <TableCell>
                  <FormDialog
                    label={'Delete'}
                    timesheetId={timesheet.id} 
                    loadTimesheets={loadTimesheets}
                    zhuLiDoTheThing={deleteTimesheets}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveTimesheets;
