import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api';
import axios from 'axios';
import {CryptoState} from '../../CryptoContext'
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() =>({
     carousel : {
      height : "50%",
      display : "flex",
      alignItems : 'center',
     },

     carouselItem : {
      display : "flex",
      justifyContent : 'center',
      alignItems : 'center',
      flexDirection : 'column',
      textTransform : 'uppercase',
      color : 'white',
     }
}))

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {

  const [trending, setTrending] = useState([]);
   
  const {currency, symbol} = CryptoState();
  

  const classes = useStyles();

  const fetchTrendingCoin = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };
  
  // console.log(trending);
  useEffect(() => {
    fetchTrendingCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);


  const iteams = trending.map((coin) =>{
    let profit = coin?.price_change_percentage_24h >= 0;

    return(
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt= {coin.name}
          height= "80"
          style={{
            marginBottom : "10px"
          }}
          />
           <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{color : "darkgray"}}>
          {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>

      </Link>
    )
  })
  
  const responsive = {
    0 :{
        items : 2,
    },
    512 :{
        items : 4,
    },
};
  return (
    <div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        responsive={responsive}
        items={iteams}
            
        />
    </div>
  )
}

export default Carousel