import React from 'react'
import NegativnaKarticaDetails from './NegativnaKarticaDetails'
import { Grid, List, ListItem } from '@mui/material'
import KarticeDetails from './KarticeDetails'

const NegativneKartice = ({kartice}) => {
 
  return (
    <div>
      { kartice.length===0 ? null :
      <List>
      <ListItem disablePadding sx={{  backgroundColor:"#f5f5f5", fontWeight:100, color:"#8d6e63",py:1,pl:1}}>
        <Grid container >
          <Grid item xs={3}  >
              Naziv kartice
          </Grid>
          <Grid item xs={2}> Duguje </Grid>
          <Grid item xs={2}> Potražuje </Grid>
          <Grid item xs={2}> Saldo </Grid>
        </Grid>
      </ListItem>
      
      { kartice.map(kartica=>{
        // return <NegativnaKarticaDetails key={kartica._id} kartica={kartica} />
        return  <KarticeDetails key={kartica._id} kartica={kartica} />
      })}
      </List>
      }
    </div>
  )
}

export default NegativneKartice