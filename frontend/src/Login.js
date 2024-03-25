import { Box, Button, Link, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/LoginOutlined';
import React from 'react'

const Login = () => {
  return (
    <Box sx={{ width:"vw", height:"94vh", boxSizing:"border-box", backgroundColor:"#eee",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
     }} >
            <Box sx={{ width:"300px",
             
             boxSizing:"border-box",
              backgroundColor:"#fff", 
              px:1,
              pt:2,
              borderRadius:"12px",
              '&> :not(style)':{
                width:"100%",
                mb:1,
              }
              }}>
                <Box component="img" src="depozit.png" /> 
                <Box sx={{ 
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    '&> :not(style)':{
                        fontSize:"1.5rem",
                        mr:2,
                        color:"info.dark"
                    }
                    }}>

                <LoginIcon  />
                <Typography >Prijava</Typography>
                </Box>
               
             <TextField  type="text" size='small' label="User name" ></TextField>
             <TextField  type="password" size='small' label="Password" ></TextField>
             <Button variant="contained" color="success">Prijava</Button>
             <Button variant="contained" color="warning">Cancel</Button>
             <Box sx={{ 
                '&> :not(style)':
                { 
                    fontSize:"0.8rem"
                }
                }}>
             <Typography sx={{ color:"info.dark", textAlign:"center"}} >You are not registered yet? </Typography>
            <Typography sx={{ color:"info.dark", textAlign:"center"}} > 
            <Link sx={{ textDecoration:"none", cursor:"pointer", '&:hover':{ textDecoration:"underline"}}}>
            Please register here
            </Link>
           
            </Typography>
             </Box>

            </Box>
    </Box>
  )
}

export default Login