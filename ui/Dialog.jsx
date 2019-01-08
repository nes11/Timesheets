import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen () {
    this.setState({ open: true });
  };

  handleClose () {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen()}>
          Completed
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              A password is required for this action.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() => {
                console.log('password');
                this.handleClose();
              }}
              color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;