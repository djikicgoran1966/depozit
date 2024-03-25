import React, { useState} from 'react'
import { NEGATIVEKARTICE, GETKARTICEBYSUM } from '../../queries/kartice'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Box, Button, Checkbox, TextField, Typography, FormControlLabel, Divider, CircularProgress,Alert } from '@mui/material'
import NegativneKartice from './NegativneKartice'
import AppPagination from './AppPagination'
import Stanje from '../stavke/Stanje'


const ProveraStanja = () => {
    const [ newError,setNewError]=useState(false)
    const [ from,setFrom]=useState("")
    const [ to,setTo]=useState("")
    const [ checked,setChecked]=useState(false)
    const [length,setLength]=useState(0)
    const [result,setResult]=useState([])
    
    const {loading, error, data}  = useQuery(NEGATIVEKARTICE)
     const [ getKarticeBySum,{loading:loadingKartice,error:errorKartice,data:dataKartice}]=useLazyQuery(GETKARTICEBYSUM ,{ onCompleted: (dataKartice)=>{
     console.log( "data from getKartice by sum are ", dataKartice.getKarticeBySum) 
      let res=[...dataKartice.getKarticeBySum]
      res.sort((a, b) => (a.kartica.naziv.toUpperCase() > b.kartica.naziv.toUpperCase()) ? 1 : -1)
      console.log("res is", res)
      // setResult(dataKartice.getKarticeBySum)
      setResult(res)
      setLength(dataKartice.getKarticeBySum.length)
      setNewError(false)

    }
     })

    if(loading) return <CircularProgress />

    if(loadingKartice ) return <CircularProgress />
    // console.log("Data is ",data)
    
    const handleChange=(e)=>{
      setNewError(false)
      setChecked(e.target.checked)
      setFrom("")
      setTo("")
      setResult([])
      if(!checked){
      setLength(0)
     } 
   }

   const handleSearch=()=>{
    setNewError(true)
    getKarticeBySum( { variables:{from,to}} )
   }


    return (
    <Box sx={{
        maxWidth:"xl"
    }}
    >
          <Box sx={{ display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{ fontWeight:100, fontSize:"1.25rem",color:"#8d6e63"}}  > Provera stanja na karticama    </Typography> 
        <Stanje />
        </Box>
         <Divider sx={{ mb:5}} />

           { newError && errorKartice && <pre>  { errorKartice.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
 
   
    <FormControlLabel sx={{ display:"block" }} control={<Checkbox checked={ checked} onChange={handleChange}   />} label="Negativan saldo" />
    <TextField sx={{ mr:2 }} label="Saldo od" size="small" disabled={checked} value={from} onChange={(e)=>setFrom(e.target.value)} />
    <TextField sx={{ mr:2 }} label="Saldo do" size="small" disabled={ checked} value={to} onChange={(e)=>setTo(e.target.value)} />
   
     <Button disabled={checked} color="inherit" variant="outlined"  onClick={handleSearch}>Pretraži</Button>
    {
     length===0   ?
      checked===false ? null :
    <Typography sx={{ color:"#8d6e63", fontWeight:100, background:"#f5f5f5",py:2,my:2,width:"200px",textAlign:"center",borderRadius:3 }} >
    Pronađeno je: { data.negativeKartice.length } kartica
    </Typography> 
     
    :  
     <Typography  sx={{ color:"#8d6e63", fontWeight:100, background:"#f5f5f5",py:2,my:2,width:"200px",textAlign:"center",borderRadius:3 }} >Pronađeno je: { length} kartica </Typography> 
    }
    <Divider sx={{ mt:3}} />
    <Box>
      {/* { checked===false ? <NegativneKartice kartice={result} />  :  <NegativneKartice kartice={data.negativeKartice} />  } */}
      { checked===false ? <AppPagination kartice={result} /> : <AppPagination kartice={ data.negativeKartice} />  }
    </Box>

    </Box>
  )
}

export default ProveraStanja