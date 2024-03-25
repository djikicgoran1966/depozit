import { Grid, IconButton, List, ListItem } from '@mui/material'
import PreviewIcon from '@mui/icons-material/PreviewOutlined';
import { Link } from 'react-router-dom'
import React from 'react'

const NegativnaKarticaDetails = ({kartica}) => {
  return (
    <div>
    
      <ListItem disablePadding sx={{ 
        cursor:"pointer",
        py:1,
        pl:1,
        "&:hover" :{
          backgroundColor:"primary.light",
          color:"white"
        }
        }}  >


          <Grid container>
          <Grid item xs={3}> {kartica.kartica.naziv}  </Grid>
          <Grid item xs={2}>   { parseFloat(kartica.sumPotrazuje).toFixed(2)  } </Grid>
          <Grid item xs={2}>   { parseFloat(kartica.sumDuguje).toFixed(2)  } </Grid>
          <Grid item xs={2} >  { parseFloat(kartica.saldo).toFixed(2)  } </Grid>
          <Grid item xs={2} sx={{ textAlign:"right"}} >  <Link  to="/proveraResult"    target="_blank" >  <PreviewIcon    />  </Link>    </Grid>
        </Grid>

      </ListItem>

    
     
    </div>
  )
}

export default NegativnaKarticaDetails