import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { HistoricalChart } from './config/api';


const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  
  
  

  const {currency} = CryptoState();

  const fetchHistoricData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  }
  
//   console.log(historicData);

  useEffect(() => {
    fetchHistoricData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

 

  return (
    <ThemeProvider theme={darkTheme} >
    <CssBaseline />
    <div className="coininfo">
       {
        !historicData ? (
         <CircularProgress 
          style={{
            color : "gold"
          }}
          size={250}
          thickness={1}
         />
        ):(<>
          <Line style={{width : "900px",marginTop : "50px", }}
          data={{
            labels :  historicData.map((coin) =>{
              let date = new Date(coin[0]);
              let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets  : [ {data : historicData.map((coin)=> coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
              }]
          }} 
          options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
          />  
        </>)
       }
       
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo