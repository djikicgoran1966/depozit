import React from 'react'
import { ListItem,Grid } from '@mui/material'
const NalogDetailsPrint = ({nalog}) => {
  return (
    <div>
        
        <ListItem  disablePadding sx={{ 
            borderBottom:"1px solid black", 
            '&:hover':{ cursor:"pointer", backgroundColor:"#fffffe",
            
            },
            '&> :not(style)':{
                fontSize:"0.7rem"
            }
        }}
             compoment="Grid" > 
            
          
            <Grid item xs={4}>
            { nalog.kartica.naziv}
            </Grid>
           
            <Grid item xs={3}>
  
            { parseFloat( nalog.sumDuguje).toFixed(2)  }
            </Grid>
            <Grid item xs={3}>
            { parseFloat( nalog.sumPotrazuje).toFixed(2)  }
            </Grid> 
            <Grid item xs={2}>
            { parseFloat( nalog.saldo).toFixed(2)  }
            </Grid> 
        </ListItem>

    </div>
  )
}

export default NalogDetailsPrint