import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <div>
<Box sx={{ width:"100%", height:"100%",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",boxSizing:"border-box" }}>
   <Typography sx={{ fontSize:"8rem", color:"secondary.main"}}>404</Typography>
   <Typography sx={{ fontSize:"3rem", color:"secondary.main"}}>Stranica nije pronađena</Typography>
</Box>

    </div>
  )
}

export default NotFound