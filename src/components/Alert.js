import React from 'react'
import { CryptoState } from '../CryptoContext'
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = () => {

    const {alert, setAlert} = CryptoState();
    // const handleClick = () => {
    //  setOpen(true);
    // };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({open: false});
   };
  return (
    <Snackbar open={alert.open}
    autoHideDuration={4000}
    onClose={handleClose}
    >
    <MuiAlert
    onClose={handleClose}
    elevation={10}
    variant="filled"
    severity={alert.type}
    
    >
     {alert.message}
    </MuiAlert>

    </Snackbar>
  )
}

export default Alert