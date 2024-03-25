import React,{ useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import { Box, Typography } from '@mui/material'
const Profile = () => {
  const context=useContext(AuthContext)
  return (
    <div>
      <Box sx={{
        width:600,
        mt:5,
        border:"1px solid black",
        '& > :not(style)' :{
          p:1,
          borderBottom:"1px solid black",
          fontWeight:100,
          '&:last-child':{
            borderBottom:"none"
          }
        }
      }}>
      <Typography sx={{ backgroundColor:"info.dark", color:"white",fontWeight:500}}>Profil korisnika</Typography>
      <Typography> Ime: {context.firstName}</Typography>
      <Typography> Prezime: {context.lastName}</Typography>
      <Typography> Email: {context.email}</Typography>
      <Typography> Uloga: { context.role==="user" ? "Korisnik" : "Administrator" } </Typography>
      </Box>
    </div>
  )
}

export default Profile