import { List, ListItem, TextField,Box, Typography, Divider, Checkbox, FormControlLabel, Button } from '@mui/material'
import CreateKarticaModal  from './CreateKarticaModal'
import { FINDNKARTICE } from '../../queries/kartice'
import React, { useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
import KarticaDetails from './KarticaDetails'
import { ToastContainer, toast } from 'react-toastify';
import AppPagination from './AppPagination'
const Kartice = () => {
  const [ kartice,setKartice]=useState([])
  const [ naziv, setNaziv]=useState("")
  // const [ checked ,setChecked] =useState(false)
  const [ findKartice,{loading, error, data}]  = useLazyQuery(FINDNKARTICE,{onCompleted:(kartice)=>{
    console.log("Pretraga started,", data)
   
    if(kartice){
     console.log("Kartice su ",kartice)
      setKartice(kartice.findKartice)
    }
  }
} )  

const handleChangeNaziv=(e)=>{
    if (naziv==="") {
    setKartice([])
    }
  
  setNaziv(e.target.value)
}

const handleFindKartice=()=>{
  findKartice({ variables:{naziv}})
}

if(loading) return "Loading"

  return (
    <Box sx={{
      maxWidth:"xl",
      mx:"auto"
    }}>
       <ToastContainer />
       <Typography sx={{ fontWeight:300, fontSize:"1.25rem",color:"#8d6e63"}}  > Kartice depozita </Typography> 
       <Divider sx={{ mb:5}} />
     {/* <Typography sx={{ textAlign:"center", fontStyle:"italic", fontWeight:100, fontSize:"1.5rem",color:"info.dark"}}>Kartice depozita</Typography> */}
     <Box sx={{ display:"flex", justifyContent:"end"}}>
     <CreateKarticaModal  />
     </Box>
   
    <Box sx={{ display:"flex", alignItems:"center"}}>
     
    <TextField value={naziv} sx={{ my:2, mr:3}}  onChange={handleChangeNaziv} size="small" label="Naziv kartice" />
    <Button color="inherit" variant="outlined" onClick={handleFindKartice} >Pronađi</Button>
    {/* <FormControlLabel control={<Checkbox   checked={checked} onChange={handleCheckChange} />} label="Sve kartice" /> */}
     
    </Box>
    <Divider sx={{ mt:1}} />
    {  kartice.length===0 ? "": 
       <List disablePadding>
      <ListItem sx={{  backgroundColor:"#f5f5f5", fontWeight:100, color:"#8d6e63", maxWidth:"xl"}}>Naziv kartice</ListItem>
      
      
       {/* { kartice.map(kartica=>{
            return <KarticaDetails key={ kartica._id } kartica={kartica} /> 
            
        }) } */}
      
      </List> 
    
    }
        <AppPagination kartice={kartice} length={ kartice.length} />
    </Box>
  )
}

export default Kartice



