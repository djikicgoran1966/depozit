import { Typography,Box } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <div>
      <Box sx={{
            color:"#fff",
            backgroundColor:"info.dark",
            height:"6vh",
            boxSizing:"border-box",
            py:0,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }} > 
           <Typography variant='h3' sx={{ fontWeight:100,m:0 }} >
            {/* Novčani depozit Privrednog suda u Nišu */}
            PS Niš
        </Typography>
      </Box>
       
    </div>
  )
}

export default Header