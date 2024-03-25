import {  ListItem, Grid } from '@mui/material'
import React from 'react'
import NalogMenu from './NalogMenu'
import { parse } from 'graphql'

const NalogDetails = ({nalog}) => {

  return (
    <div>
        <ListItem disableGutters disablePadding sx={{ maxWidth:"lg", '&:hover':{ cursor:"pointer", backgroundColor:"#fffffe",}}} compoment="Grid" > 
            <Grid item xs={2}>
            {/* {nalog.oznaka.naziv} */}
            {nalog.oznaka.naziv==="NN" ? "" : nalog.oznaka.naziv }
            {nalog.broj_predmeta===null ? "": "-" } 
            { nalog.broj_predmeta}
            {nalog.godina_predmeta===null ? "": "-" } 
            {nalog.godina_predmeta}
            </Grid>
            <Grid item xs={3}>
            { nalog.kartica.naziv}
            </Grid>
            <Grid item xs={2}>
            { nalog.korisnik}
            </Grid> 
            <Grid item xs={2}>
            {nalog.deponent}
            </Grid>
            <Grid item xs={1}>
            { parseFloat(nalog.duguje).toFixed(2)}
            </Grid>
            <Grid item xs={1}>
            {  parseFloat(nalog.potrazuje).toFixed(2)}
            </Grid> 
            {/* <Grid item xs={1}>
            { (new Date(nalog.datum)).toLocaleDateString() }
            </Grid>  */}
            <Grid item xs={1}>
            <NalogMenu nalog={nalog} />
            </Grid> 
        </ListItem>
          
    </div>
  )
}

export default NalogDetails