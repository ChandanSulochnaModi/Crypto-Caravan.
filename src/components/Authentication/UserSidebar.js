import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import './UserSidebar.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';


export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert, watchlist, coins, symbol} = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
      signOut(auth);
      setAlert({
        open :true,
        message : "Logout Successful.",
        type : "success"
      });
      toggleDrawer();
  }

  const removeFromWatchlist = async (coin) =>{
    const coinRef = doc(db,"watchlist",user.uid);
    try {
       await setDoc(coinRef,{
        coins : watchlist.filter((watch) => watch !== coin?.id),
       },
       {
        merge : "true",
       }
       );
       setAlert({
        open : true,
        message : `${coin.name} Removed from the Watchlist.`,
        type : "success",
       })
    } catch (error) {
      setAlert({
        open :true,
        message : error.message,
        type : "error",
      })
      
    }
   }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Avatar
            onClick= {toggleDrawer(anchor, true)}
            style={{
                height :35,
                width : 35,
                marginLeft : 20,
                cursor : 'pointer',
                backgroundColor : '#EECD1D',
            }}
            src = {user.photoURL}
            alt={user.display || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
           <div className='usersidebar'>
              <div className="profile">
                <Avatar 
                    className='picture'
                    style={{
                      width : "120px",
                      height : "120px",
                      marginTop :"30px",
                      backgroundColor : '#EECD1D',
                    }}
                    src={user.photoURL}
                    alt={user.display || user.email}
                />
                <span style={{
                width: "100%",
                fontSize : 25,
                textAlign: "center",
                fontWeight : "bolder",
                wordWrap : "break-word",
                fontFamily : "Montserrat",
               }}>
                {user.displayName || user.email}
                </span>
                <div className="watchlist">
                    <span style={{fontSize : 15,textShadow : "0 0 5px black"}}>
                        WatchList
                    </span>
                    {
                    coins.map((coin) => {
                      if(watchlist.includes(coin.id)){
                        return (
                           <div className='coin'>
                              <span>{coin.name}</span>
                              <span style={{display : "flex",gap : 8,}}>
                                {symbol}
                                {numberWithCommas(coin.current_price.toFixed(2))}
                              </span>
                               <AiFillDelete style={{cursor : "pointer", fontSize : 16}}
                               onClick={()=> removeFromWatchlist(coin)}
                                />
                           </div>
                        )
                      }
                    })
                  }
                </div>
                
              </div>
              <Button
              style={{
                width : "100%",
                height : "6%",
                backgroundColor : '#EECd1D',
                marginTop :"20px",
                fontFamily : 'Montserrat',
                color : 'black'

              }}
              variant='container'
              className='logout'
               onClick={logOut}
              >Logout</Button>
           </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
