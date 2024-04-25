import { Container, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import './Banner.css';
import Carousel from './Carousel';

const useStyles = makeStyles(() =>({
    banner : {
        backgroundImage : "url(./banner9.jpg)",
    },
    bannerContent : {
        height : 400,
        display : "flex",
        flexDirection : "column",
        paddingTop : 25,
        justifyContent : "space-around",
    },
    tagline : {
        display : "flex",
        height : "40%",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
    }
}))


const Banner = () => {

    const classes = useStyles();

  return (
    <div className = {classes.banner}>
        <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography variant='h2'
            style={{
                fontFamily : "Montserrat",
                fontWeight : "bold",
                marginTop : "15px"
            }}>
              Crypto Market
            </Typography>
            <Typography variant='subtitle2'
            style={{
                color : 'darkgray',
                fontFamily : 'Montserrat',
                marginTop : "15px",
                textTransform : 'capitalize',

            }}
            >
            Get all the Info regarding your favourite Crypto Currency
            </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner