import React, { useState} from 'react'
import { GETKARTICEBYYEAR } from '../../queries/kartice'
import { useLazyQuery } from '@apollo/client'
import { Box, Button, TextField, Typography, FormControlLabel, Divider, CircularProgress,Alert } from '@mui/material'

import AppPagination from './AppPagination'
import Stanje from '../stavke/Stanje'


const BrutoBilans = () => {
    const [ newError,setNewError]=useState(false)
    const [ year,setYear]=useState("")
    const [length,setLength]=useState(0)
    const [result,setResult]=useState([])
    const [dugujeSum,setDugujeSum]=useState(0)
    const [potrazujeSum,setPotrazujeSum]=useState(0)
   
     const [ getKarticeByYear,{loading,error,data}]=useLazyQuery(GETKARTICEBYYEAR ,{ onCompleted: (dataKartice)=>{
     console.log( "data from getKartice by year are ", dataKartice.getKarticeByYear) 
   
      if(dataKartice){
        let dSum=0
        let pSum=0
         setLength(dataKartice.getKarticeByYear.length)
         for (let i=0; i<dataKartice.getKarticeByYear.length;i++){
             dSum=dSum+parseFloat(dataKartice.getKarticeByYear[i].sumDuguje)
             pSum=pSum+parseFloat(dataKartice.getKarticeByYear[i].sumPotrazuje)
             console.log(dataKartice.getKarticeByYear[i].sumDuguje,dataKartice.getKarticeByYear[i].sumPotrazuje )
         }

         console.log("Sume su ",dSum,pSum)
       
        console.log("Data stavke su ",dataKartice)
        setDugujeSum(dSum)
        setPotrazujeSum(pSum) 

      setResult(dataKartice.getKarticeByYear)
      setLength(dataKartice.getKarticeByYear.length)
      console.log("Length is", dataKartice.getKarticeByYear.length)
      setNewError(false)
        }
    }
     })

    if(loading) return <CircularProgress />


   const handleSearch=()=>{
    setResult([])
    setLength(0)
    setDugujeSum(0)
    setPotrazujeSum(0)
    setNewError(true)
    getKarticeByYear( { variables:{year}} )
   }


    return (
    <Box sx={{
        maxWidth:"xl"
    }}
    >
          <Box sx={{ display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{ fontWeight:100, fontSize:"1.25rem",color:"#8d6e63"}}  > Bruto bilans    </Typography> 
        <Stanje />
        </Box>
         <Divider sx={{ mb:5}} />

           { newError && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
 
   
    <TextField sx={{ mr:2 }} label="Godina" size="small"  value={year} onChange={(e)=>setYear(e.target.value)} />
   
     <Button  color="inherit" variant="outlined"  onClick={handleSearch}>Pretraži</Button>
    
     {/* <Typography  sx={{ color:"#8d6e63", fontWeight:100, background:"#f5f5f5",py:2,my:2,width:"200px",textAlign:"center",borderRadius:3 }} >Pronađeno je: { length} kartica </Typography>  */}
    
    <Divider sx={{ mt:3}} />
    <Box>
      {/* { checked===false ? <NegativneKartice kartice={result} />  :  <NegativneKartice kartice={data.negativeKartice} />  } */}
      <AppPagination kartice={result} dugujeSum={dugujeSum} potrazujeSum={potrazujeSum} length={length} year={year} /> 
       </Box>

    </Box>
  )
}

export default BrutoBilans