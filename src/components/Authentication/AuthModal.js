import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const {setAlert} = CryptoState()

  const handleChange = (event, newValue) =>{
      setValue(newValue);
  }

  const googleProvider = new GoogleAuthProvider();
 
  const signInWithGoogle = () =>{
    signInWithPopup(auth,googleProvider).then(res =>{
       setAlert({
        open : true,
        message : `Signup Successfull. Welcome ${res.user.email}`,
        type : 'success',
       });
       handleClose();
    }).catch(error =>{
      setAlert({
        open :true,
        message : error.message,
        type : "error",
      });
    })
  }
  return (
    <div>
      <Button onClick={handleOpen}
      style={{
        width : 95,
        height : "25",
        marginLeft : '15px',
        backgroundColor : '#EECD1D',
        fontFamily : 'Montserrat',
        color : 'black'
      }}>REGISTER</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar position='static'
            style={{backgroundColor : 'transparent', color : 'white'}}>
             <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab style={{fontFamily:"Montserrat"}} label="Login" />
                <Tab style={{fontFamily:"Montserrat"}} label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose}/>}
            {value === 1 && <Signup handleClose={handleClose} />}
            <div style={{display: "flex",
             flexDirection : "column",textAlign : "center",gap: "20", fontSize : "20"
             }}>
            <Box>
            <span>OR</span>
            <GoogleButton 
                 style={{width : "100%", outline : "none",marginTop :"15px",  
                 }}
                 onClick={signInWithGoogle}
                />

            </Box>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
