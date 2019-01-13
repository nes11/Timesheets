import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import moment from 'moment';
import FormDialog from './Dialog.jsx';
import Typography from '@material-ui/core/Typography';
import sortBy from 'lodash/sortBy';

class ActiveTimesheets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'name'
    };

  }
  markTimesheetComplete(timesheetId, password) {
    return axios.post(`/markTimesheetComplete/${timesheetId}`, { password })
      .then(() => this.props.loadTimesheets());
  }

  deleteTimesheets(timesheetId, password) {
    return axios.post(`/deleteTimesheet/${timesheetId}`, { password })
      .then(() => this.props.loadTimesheets());
  }

  render() {
    const sortedTimesheets = sortBy(
      this.props.timesheets.filter((el) => el.status === 'active'),
      this.state.header,
    );
    return (
      <div>
        <Typography style={{ color: 'hsla(204, 64%, 40%,1)' }} >
          Active timesheets
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={(event) => this.setState({ header: 'name' })}>Name</TableCell>
              <TableCell onClick={(event) => this.setState({ header: 'description' })}>Description</TableCell>
              <TableCell onClick={(event) => this.setState({ header: 'time' })}>Date</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTimesheets.map(timesheet => (
              <TableRow key={timesheet.id}>
                <TableCell>{timesheet.name}</TableCell>
                <TableCell>{timesheet.description}</TableCell>
                <TableCell>{moment(timesheet.time).format('dddd, DD MMM YYYY - HH:mm')}</TableCell>
                <TableCell>
                  <FormDialog
                    label={'Completed'}
                    timesheetId={timesheet.id}
                    zhuLiDoTheThing={this.markTimesheetComplete.bind(this)}
                  />
                </TableCell>
                <TableCell>
                  <FormDialog
                    label={'Delete'}
                    timesheetId={timesheet.id}
                    zhuLiDoTheThing={this.deleteTimesheets.bind(this)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
}
export default ActiveTimesheets;
