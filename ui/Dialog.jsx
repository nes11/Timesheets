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
      password: '',
      error: false,
      passwordValid: 'Password'
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
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => this.handleClickOpen()}
        >
          {this.props.label}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
        >
          <DialogTitle>Password</DialogTitle>
          <DialogContent>
            <DialogContentText>A password is required for this action.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={this.state.passwordValid}
              type="password"
              fullWidth
              error={this.state.error}
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => this.handleClose()} 
              color="primary">
              Cancel
            </Button>
            <Button 
              onClick={async () => {
                await this.props.zhuLiDoTheThing(this.props.timesheetId, this.state.password)
                  .then(() => this.handleClose())
                  .catch(() => this.setState({ error: true, passwordValid: 'Incorrect password' }));
                
              }}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;