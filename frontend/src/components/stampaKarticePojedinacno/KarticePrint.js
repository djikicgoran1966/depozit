import React from 'react'
import { useQuery } from '@apollo/client'
import { PROMETSUM } from '../../queries/stavke'
import { Grid, List, ListItem,Box,Button,Typography, Divider } from '@mui/material'
import KarticeDetails from './KarticeDetails'
import KarticeDetailsPrint from './KarticeDetailsPrint'
const KarticePrint = ({printTrigger, kartice,year, sumDuguje, sumPotrazuje,length,result }) => {
 console.log("PRINT TRIGGER",printTrigger)
 const { isLoading, data, error }=useQuery(PROMETSUM ,{variables:{ year} })

 if(isLoading) return "Loading..."

 console.log("DATA FROM KARTICE PRINT ARE", data)
 
 return (
    <div>
     
      { length===0   ? null :
     <Box>
           <Typography sx={{ textAlign:"center",my:2,fontSize:'1.3rem'}}>Promet na karticama Privrednog suda u Nišu za { year} godinu</Typography>
           <Divider />
           { data ? 
       <Box sx={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        '&> :not(style)':{
          mr:2
        }
        }}>
       <Box>  Duguje:  {parseFloat(data.prometSum.duguje).toFixed(2)}</Box>  
       <Box> Potražuje: { parseFloat(data.prometSum.potrazuje).toFixed(2)}</Box>  
       <Box>  Saldo: { parseFloat(data.prometSum.suma).toFixed(2) }</Box> 
      </Box> 
        :null }
        <Divider />
     <List>
      
      { kartice.map(kartica=>{
        return  <KarticeDetailsPrint key={kartica._id} kartica={kartica} year={year} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} />
      })}
      </List>
      </Box>
      
      }
      
       
      { data ? 
       <Box sx={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        '&> :not(style)':{
          mr:2
        }
        }}>
       <Box>  Duguje:  {parseFloat(data.prometSum.duguje).toFixed(2)}</Box>  
       <Box> Potražuje: { parseFloat(data.prometSum.potrazuje).toFixed(2)}</Box>  
       <Box>  Saldo: { parseFloat(data.prometSum.suma).toFixed(2) }</Box> 
      </Box> 
        :null }
    
    </div>
  )
}

export default KarticePrint