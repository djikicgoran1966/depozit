import { List, ListItem, TextField,Box, Typography, Divider, Checkbox, FormControlLabel, Button, CircularProgress, Grid } from '@mui/material'
// import CreateKarticaModal  from './CreateKarticaModal'
import { GET_USERS } from '../../queries/user'
import React, { useState, useEffect,useContext} from 'react'
import { useQuery } from '@apollo/client'
import AuthContext from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import UserDetails from './UserDetails';
import CreateUserModal from './CreateUserModal';
import { checkToken } from '../../middleware/check-token';
const Users = () => {
  const [ kartice,setKartice]=useState([])
  const [ naziv, setNaziv]=useState("")
  // const [ checked ,setChecked] =useState(false)
  
  const context=useContext(AuthContext)
  useEffect ( ()=>{
    checkToken(context)
  })
  
  const {loading, error, data}  = useQuery(GET_USERS)

  if(loading) return <CircularProgress />
  
const handleChangeNaziv=(e)=>{
    if (naziv==="") {
    setKartice([])
    }
  
  setNaziv(e.target.value)
}





  return (
    <Box sx={{
      maxWidth:"xl",
      mx:"auto"
    }}>
       <ToastContainer />
       <Typography sx={{ fontWeight:300, fontSize:"1.25rem",color:"#8d6e63"}}  > Korisnici sistema </Typography> 
       <Divider sx={{ mb:5}} />
     {/* <Typography sx={{ textAlign:"center", fontStyle:"italic", fontWeight:100, fontSize:"1.5rem",color:"info.dark"}}>Kartice depozita</Typography> */}
     <Box sx={{ display:"flex", justifyContent:"end"}}>
     <CreateUserModal  />
     </Box>
   
    {/* <Box sx={{ display:"flex", alignItems:"center"}}> 
    <TextField value={naziv} sx={{ my:2, mr:3}}  onChange={handleChangeNaziv} size="small" label="Naziv kartice" />
    <Button color="inherit" variant="outlined" onClick={handleFindKartice} >Pronađi</Button>
    <FormControlLabel control={<Checkbox   checked={checked} onChange={handleCheckChange} />} label="Sve kartice" />
    </Box> */}
    
    <Divider sx={{ mt:1}} />
    {  data.users.length===0 ? "": 
       <List disablePadding >
      <ListItem  sx={{  backgroundColor:"#f5f5f5", fontWeight:100, color:"#8d6e63", maxWidth:"xl"}}>
      {/* <ListItem sx={{  backgroundColor:"info.dark", fontWeight:100, color:"white", maxWidth:"xl"}}> */}
       <Grid container>
        <Grid item xs={2}> Ime </Grid>
        <Grid item xs={2}> Prezime </Grid>
        <Grid item xs={2}> E mail </Grid>
        <Grid item xs={2}> Uloga </Grid>
        </Grid>
        
       </ListItem>
      
      
       { data.users.map(user=>{
            return <UserDetails id={ user._id } user={user} /> 
            
        }) }
      </List> 
     
    }
    </Box>
  )
}

export default Users

