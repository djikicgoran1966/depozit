import React,{useState} from 'react'
import { useQuery } from '@apollo/client'
import { PROMETSUM } from '../../queries/stavke'
import { Grid, List, ListItem,Box,Button,Typography } from '@mui/material'
import KarticeDetails from './KarticeDetails'
import KarticePrint from './KarticePrint'
import PrintComponents from 'react-print-components'
const Kartice = ({kartice,year, sumDuguje, sumPotrazuje,length,result }) => {
 const [printTrigger, setPrintTrigger]=useState(false)

 const { isLoading, data, error }=useQuery(PROMETSUM ,{variables:{ year} })

 if(isLoading) return "Loading..."

  return (

   

    <div>

     
      { kartice.length===0 ? null :
     <Box sx={{ mt:1}}>
      <Box sx={{  display:"flex",
      justifyContent:"flex-end",
       alignItems:"center",
       '&> :not(style)':{
        mr:2,
        border:"1px solid",
        borderRadius:1,
        p:1
       }
       }}>
      <PrintComponents  trigger={ <Button  color="inherit"  variant='outlined' >Štampa</Button>  } >
             <KarticePrint printTrigger={printTrigger} kartice={kartice} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} year={year} />
      </PrintComponents>
        <Box>
          Duguje:  {parseFloat(data.prometSum.duguje).toFixed(2)}
        </Box>
        <Box>
          Potražuje:  {parseFloat(data.prometSum.potrazuje).toFixed(2)}
        </Box>
        <Box>
          Saldo:  {parseFloat(data.prometSum.suma).toFixed(2)}
        </Box>
          
      </Box>
       {/* <PrintComponents  trigger={ <Button  color="inherit"  variant='outlined' >Štampa</Button>  } >
          <KarticePrint printTrigger={printTrigger} kartice={kartice} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} year={year} />
       </PrintComponents> */}

     <List>
      
      { kartice.map(kartica=>{
        // return <NegativnaKarticaDetails key={kartica._id} kartica={kartica} />
        return  <KarticeDetails key={kartica._id} kartica={kartica} year={year} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} />
      })}
      </List>
      </Box>
      }
    </div>
  )
}

export default Kartice