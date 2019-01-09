import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormDialog from './Dialog.jsx';
import moment from 'moment';
import axios from 'axios';

const CompletedTimesheets = ({ timesheets, loadTimesheets }) => {
  const deleteTimesheets = (timesheetId) => {
    axios.post(`/deleteTimesheet/${timesheetId}`, { password: 'ham sandwich' })
      .then(() => loadTimesheets());
  };

  return (
    <div>
      Completed timesheets
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timesheets
            .filter((el) => el.status === 'completed')
            .map(timesheet => (
              <TableRow key={timesheet.id}>
                <TableCell>{timesheet.name}</TableCell>
                <TableCell>{timesheet.description}</TableCell>
                <TableCell>{moment(timesheet.time).format('dddd, DD MMM YYYY - HH:mm')}</TableCell>
                <TableCell>
                  <FormDialog 
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

export default CompletedTimesheets;