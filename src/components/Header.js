import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, CssBaseline, MenuItem, Select, ThemeProvider, createTheme } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';


export default function Header() {

   
    const {currency, setCurrency, user} = CryptoState();

    console.log(currency);
    const Navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" color='transparent'>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} 
           onClick={() => Navigate("/")}
           style={{
            flex : 1,
            fontFamily : "Montserrat",
            fontWeight : 'bold',
            color : "#EECD1D",
            cursor : "pointer",
           }}
          >
            Crypto Caravan
          </Typography>
          <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value = {currency}
              onChange={(e) => setCurrency(e.target.value)}
              
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            { user ? <UserSidebar /> :<AuthModal />}
        </Toolbar>
        </Container>
      </AppBar>
   
    </ThemeProvider>
  );
}