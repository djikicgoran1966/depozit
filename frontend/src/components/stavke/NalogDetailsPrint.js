import React from 'react'
import { ListItem,Grid } from '@mui/material'
const NalogDetailsPrint = ({nalog}) => {
  return (
    <div>
        
        <ListItem  disablePadding sx={{ maxWidth:"lg", '&:hover':{ cursor:"pointer", backgroundColor:"#fffffe",}}} compoment="Grid" > 
            <Grid item xs={2}>
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
            { nalog.duguje}
            </Grid>
            <Grid item xs={1}>
            { nalog.potrazuje}
            </Grid> 
            {/* <Grid item xs={1}>
            { (new Date(nalog.datum)).toLocaleDateString() }
            </Grid>  */}
            
        </ListItem>

    </div>
  )
}

export default NalogDetailsPrint