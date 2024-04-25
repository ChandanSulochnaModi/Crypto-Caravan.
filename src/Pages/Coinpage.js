import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './Coinpage.css';
import { Button, LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from '../components/Banner/Carousel';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../components/config/api';
import CoinInfo from '../components/CoinInfo';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';



const Coinpage = () => {

  const[coin, setCoin] = useState();

  const {currency, symbol, user, setAlert, watchlist} =CryptoState()

  const {id}=useParams();
  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log( error);
    }
   }

   const inWatchlist = watchlist.includes(coin?.id);

   const addToWatchlist = async () =>{
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef,{coins : watchlist ?[...watchlist,coin?.id]:[coin?.id],
      });
      setAlert({
        open : "true",
        message : `${coin.name} Added to Watchlist.`,
        type : 'success',
      })
    } catch (error) {
      setAlert({
        open : "true",
        message : error.message,
        type : 'error',
      })
    }
   }

   const removeFromWatchlist = async () =>{
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
  
    // console.log(coin);

    useEffect(() => {
      fetchCoin();
    // eslint-disable-next-line
    }, []);
    
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return (
    <div className='coinpage'>
      <div className='coinoneside'>
      <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className='heading' style={{fontFamily : "Montserrat", fontWeight :"bold"}}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className='description' style={{fontFamily : "Montserrat", marginTop : "5px"}}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className='marketData'>
        <span style={{ display: "flex" , fontFamily : "Montserrat"}}>
            <Typography variant="h5" className='heading' style={{fontFamily : "Montserrat",marginTop : 10,}}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                marginTop : 10,
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" , fontFamily : "Montserrat"}}>
            <Typography variant="h5" className='heading' style={{fontFamily : "Montserrat",marginTop : 10,}}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                marginTop : 10,
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className='heading' style={{fontFamily : "Montserrat",marginTop : 10,}}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                marginTop : 10,
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          { user && (
            <Button
            style={{
              width : "100%",
              height : "40px",
              marginTop : "25px",
              backgroundColor: inWatchlist ? "#ff0000":"#EECD1D",
              color : 'black',
              fontFamily : 'Montserrat',
            }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin = {coin} />
    </div>
  )
}

export default Coinpage