import { List,ListItem,Grid,Box,Typography } from '@mui/material'
import React from 'react'
import NalogDetailsPrint from './NalogDetailsPrint'

const NalogPrint = ({nalog,godina, dugujeSum,potrazujeSum, length,year}) => {
  return (
    <div>
      <Typography sx={{ fontSize:"1.2rem", textAlign:"center"}}>Bruto bilans Privrednog suda u Nišu za {year}. godinu </Typography>
      <List>
       
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
                   Duguje: { parseFloat( dugujeSum).toFixed(2)  }
                    </Box>
                    <Box  >
                    Potražuje: { parseFloat( potrazujeSum).toFixed(2)  }
                      </Box>    
                      <Box>
                      Saldo: { parseFloat( potrazujeSum-dugujeSum).toFixed(2) } 
                      </Box>    
                  </Box>
       
        </ListItem>
      <ListItem disablePadding sx={{ fontSize:"0.9rem", borderBottom:"1px solid #000",borderTop:"1px solid #000"}} compoment="Grid" container> 
                  
                    <Grid item xs={4}>
                    Kartica
                    </Grid>
                    
                    
                    <Grid item xs={3}>
                    Duguje
                    </Grid>
                    <Grid item xs={3}>
                     Potražuje
                    </Grid> 
                    <Grid item xs={2}>
                     Saldo
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