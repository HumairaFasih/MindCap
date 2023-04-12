import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import './popup.css';

export default function AlertDialog({userName, accType, onDelete}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (userName, accType) => (event) => {
    setOpen(false);
    onDelete(userName);
    event.preventDefault();
    instance.post(`admin/delete-account`, JSON.stringify({ username: userName, accType })).then((result) => {
      console.log('Deleteyay');
    }
    ).catch((err) => {
      console.log(err.message);
    }
    );
  };
  return (
    <div>
        <Typography className="typography" variant="body1" onClick={handleClickOpen}>
            Delete Account
        </Typography>
      {/* <a href='' onClick={handleClickOpen} style={{ fontFamily: 'sans-serif', color: '#61665e', marginTop: '3px' }}>Delete Account</a> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {userName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClick(userName, accType)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
