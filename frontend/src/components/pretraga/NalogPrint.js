import { List,ListItem,Grid,Box } from '@mui/material'
import React from 'react'
import NalogDetailsPrint from './NalogDetailsPrint'

const NalogPrint = ({nalog,godina,broj_izvoda,datum, dugujeSum,potrazujeSum, length}) => {
  return (
    <div>
      <List>
        {/* <ListItem sx={{ 
          display:"flex",
          justifyContent:"center",
          '&> :not(style)':{
            mr:2
          }
        }} >
          <Box>
          Godina:{ godina}
          </Box>
          <Box>
          Broj izvoda: { broj_izvoda} 
          </Box>
          <Box>
           Datum:{  new Date(datum).toLocaleDateString() } 
          </Box>
          
        </ListItem> */}
        <ListItem>
        <Box sx={{ 
                  
                  mb:2,      
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  backgroundColor:"warning.main",
                  borderRadius:1,
                  border:"2px solid #000",
                  p:2,
                  mx:"auto",
                 
                  '&> :not(style)':{
                    mr:4,  
                  }
                  }}>
                  
                    <Box >
                 Stavki:   { length}
                    </Box>
                    <Box  >
                   Duguje: { dugujeSum  }
                    </Box>
                    <Box  >
                    Potražuje: { potrazujeSum }
                      </Box>        
                  </Box>
       
        </ListItem>
      <ListItem disablePadding sx={{ fontSize:"0.9rem"}} compoment="Grid" container> 
                   <Grid item xs={2}>
                    Datum
                   </Grid>
                   
                    <Grid item xs={2}>
                    Broj predmeta
                    </Grid>
                    <Grid item xs={3}>
                    Kartica
                    </Grid>
                    <Grid item xs={2}>
                    Korisnik
                    </Grid> 
                    <Grid item xs={2}>
                    Deponent
                    </Grid>
                    <Grid item xs={1}>
                    Duguje
                    </Grid>
                    <Grid item xs={1}>
                     Potražuje
                    </Grid> 
                </ListItem>
               
                  { nalog.map(stavka=>{
                    return  <NalogDetailsPrint key={stavka._id} nalog={stavka}  />
                     
                  }) }
                
      </List>
    </div>
  )
}

export default NalogPrint