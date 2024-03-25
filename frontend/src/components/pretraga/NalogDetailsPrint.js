import React from 'react'
import { ListItem,Grid, Typography } from '@mui/material'
const NalogDetailsPrint = ({nalog}) => {
  return (
    <div>
        
        <ListItem  disablePadding sx={{ 
            borderBottom:"1px solid black", 
            '&:hover':{ cursor:"pointer", backgroundColor:"#fffffe",
            
            },
            '&> :not(style)':{
                fontSize:"0.6rem"
            }
        }}
             compoment="Grid" > 
             <Grid item xs={2}>
                { new Date(nalog.datum).toLocaleDateString()}
             </Grid>
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
            <Grid item xs={1} >
              <Typography sx={{ fontSize:'0.6rem'}}>   { parseFloat(nalog.duguje).toFixed(2)} </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{fontSize:'0.6rem'}}>  { parseFloat(nalog.potrazuje).toFixed(2)}  </Typography>
            
            </Grid> 
            {/* <Grid item xs={1}>
            { (new Date(nalog.datum)).toLocaleDateString() }
            </Grid>  */}
            
        </ListItem>

    </div>
  )
}

export default NalogDetailsPrint