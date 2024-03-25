import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GETKARTICEBYYEAR,GETKARTICEBYDETAILS } from '../../queries/kartice'
import Stanje from '../stavke/Stanje'
import AppPagination from './AppPagination'
import PrintComponents from 'react-print-components'
import KarticePrint from './KarticePrint'
import { Button, CircularProgress,Box,Typography,Divider,Alert,TextField } from '@mui/material'
import Kartice from './Kartice'
const Promet = () => {
     const [year,setYear]=useState("")
     const [newError,setNewError]=useState(true)
     const [result,setResult]=useState([])
     const [length,setLength]=useState(0)

     const [sumDuguje, setSumDuguje]=useState(0)
     const [sumPotrazuje, setSumPotrazuje]=useState(0)
   
    const [ getKarticeByYear,{loading,error,data}]=useLazyQuery(GETKARTICEBYYEAR ,{ onCompleted: (dataKartice)=>{
        console.log( "data from getKartice by details are ", dataKartice.getKarticeByYear) 
        let kartice=dataKartice.getKarticeByYear
        console.log("KARTICE ARE",kartice)
        let sumDuguje=0
        let sumPotrazuje=0
        for(let i=0;i<kartice.length;i++) {
          sumDuguje+=kartice[i].sumDuguje
          sumPotrazuje+=kartice[i].sumPotrazuje
        }
        console.log("SUM DUGUJE JE",sumDuguje)
        setSumDuguje(sumDuguje)
        setSumPotrazuje(sumPotrazuje)
        setResult(dataKartice.getKarticeByYear)
        setLength(dataKartice.getKarticeByYear.length)
        setNewError(false)
       }
        })
      
   
       if(loading) return <CircularProgress />
      
       const handleSearch=()=>{
        setResult([])
        getKarticeByYear({variables:{year}})
        // getKarticeByDetails({variables:{year}})
        setNewError(true)

       }
       
  return (
    <div>

   <Box sx={{
        maxWidth:"xl"
    }}
    >
          <Box sx={{ display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{ fontWeight:100, fontSize:"1.25rem",color:"#8d6e63"}}  > Promet na karticama    </Typography> 
        <Stanje />
        </Box>
         <Divider sx={{ mb:5}} />

           { newError && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
    
    
   
    <TextField sx={{ mr:2 }} label="Godina" size="small"  value={year} onChange={(e)=>setYear(e.target.value)} />
   
     <Button s={{ my:3}} color="inherit" variant="outlined"  onClick={handleSearch}>Pretraži</Button>
    
     {/* <Typography  sx={{ color:"#8d6e63", fontWeight:100, background:"#f5f5f5",py:2,my:2,width:"200px",textAlign:"center",borderRadius:3 }} >Pronađeno je: { length} kartica </Typography>  */}
    
    {/* <Divider sx={{ mt:3}} /> */}
    {/* <PrintComponents  trigger={ <Button  color="inherit"  variant='outlined' >Štampa</Button>  } >
          <Kartice  kartice={result} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} year={year} />
      </PrintComponents> */}

             <Box>
             
                </Box>
    <Box>
      {/* { checked===false ? <NegativneKartice kartice={result} />  :  <NegativneKartice kartice={data.negativeKartice} />  } */}
       {/* <AppPagination kartice={result} year={year} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} />  */}
       <Kartice kartice={result}   year={year} sumDuguje={sumDuguje} sumPotrazuje={sumPotrazuje} length={length} />

       </Box>

    </Box>


    </div>
  )
}

export default Promet