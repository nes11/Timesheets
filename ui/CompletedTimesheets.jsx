import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormDialog from './Dialog.jsx';
import moment from 'moment';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';


const CompletedTimesheets = ({ timesheets, loadTimesheets }) => {
  const deleteTimesheets = (timesheetId, password) => {
    return axios.post(`/deleteTimesheet/${timesheetId}`, { password })
      .then(() => loadTimesheets());
  };

  return (
    <div>
      <Typography style={ {color: 'hsla(204, 64%, 40%,1)'} }>
      Completed timesheets      
      </Typography>
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

export default CompletedTimesheets;