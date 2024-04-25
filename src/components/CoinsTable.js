import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// import { CoinList } from './config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
// import { makeStyles } from '@mui/styles';

const CoinsTable = () => {

  // const[loading, setLoading] = useState(false);
  // const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState(1)

  const {currency, symbol, coins, loading, fetchCoins} = CryptoState();
  const Navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      // const useStyles = makeStyles(() =>({


      // }))
      // const fetchCoins = async () => {
      //   try {
      //     setLoading(true);
      //     const { data } = await axios.get(CoinList(currency));
      //     setCoins(data);
      //     setLoading(false);
      //   } catch (error) {
      //     console.error('Error fetching coins:', error);
      //   }
      // };
      
      // console.log(coins);
      useEffect(() => {
        fetchCoins();
       // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency])
      
      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };


    // const classes = useStyles();
    
    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row)=>{
                  const profit = row.price_change_percentage_24h > 0;
  
                  return (
                      <TableRow onClick={() => Navigate(`/coins/${row.id}`)}
                      // className={classes.row}
                      style={{cursor:"pointer"}}
                      key={row.name}
                       >
                       <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                      </TableRow>
                  )
                })}</TableBody>
  
              </Table>
            )}
          </TableContainer>
  
          <Pagination 
           style={{
            padding : 20,
            width :"100%",
            display : "flex",
            justifyContent :"center",
           }}
            count = {(handleSearch()?.length/10).toFixed(2)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0,0);
            }}
          />
        </Container>
      </ThemeProvider> 
    )
  }
  
  export default CoinsTable