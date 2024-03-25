import { Box, Button, Link, TextField, Typography,Alert } from '@mui/material'
import LoginIcon from '@mui/icons-material/LoginOutlined';
import { USER_LOGIN } from '../../mutations/user';
import { useMutation } from '@apollo/client';
import React,{ useEffect, useState,useContext} from 'react'
import { redirect,useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'
const Login = () => {
    const [ newError, setNewError]=useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context=useContext(AuthContext)

   const [login, { error }] = useMutation(USER_LOGIN);
  
  //  useEffect(()=>{
  //   redirect('/home')
  //  })
  const navigate=useNavigate()

  const handleSubmit=e=>{
    
    e.preventDefault()
    setNewError(true)
    console.log(email)
    console.log(password)
    login({ variables:{ loginInput:{email,password}} })
    .then(result=>{
        console.log(result)
        localStorage.setItem("id",result.data.login.id)
        localStorage.setItem("firstName",result.data.login.firstName)
        localStorage.setItem("lastName",result.data.login.lastName)
        localStorage.setItem("email",result.data.login.email)
        localStorage.setItem("role",result.data.login.role)
        localStorage.setItem("token",result.data.login.token)
        localStorage.setItem("tokenExpiration",result.data.login.tokenExpiration)
        // if(localStorage.getItem("token")!==null){
        //   navigate("/home")
        // }
        console.log("Context is",context)
        context.setId(result.data.login.id)
        context.setToken(result.data.login.token)
        context.setFirstName(result.data.login.firstName)
        context.setLastName(result.data.login.lastName)
        context.setEmail(result.data.login.email)
        context.setRole(result.data.login.role)
        context.setTokenExpiration(result.data.login.tokenExpiration)
        if(result.data.login.token!==null){
          navigate("/")
        }
    })
    .catch(err=>console.log(err))
   
  }

  return (
    <Box sx={{ width:"vw", height:"94vh", boxSizing:"border-box", backgroundColor:"#eee",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
     }} >

            <Box sx={{ width:"400px",
             
              boxSizing:"border-box",
              backgroundColor:"#fff", 
              px:1,
              pt:2,
              borderRadius:"12px",
              '&> :not(style)':{
                width:"100%",
                mb:2,
              }
              }}>
                                            <Box>
                      { newError && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
                      </Box>

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

                <LoginIcon fontSize='large' />
                <Typography >Prijava na sistem</Typography>
                </Box>
               
             <TextField  type="text" size='small' label="Email" onChange={(e)=>setEmail(e.target.value)} ></TextField>
             <TextField  type="password" size='small' label="Lozinka" onChange={ (e)=>setPassword(e.target.value) } ></TextField>
             <Button variant="outlined" color="success" onClick={handleSubmit} >Prijavite se</Button>
             {/* <Button variant="contained" color="warning"></Button> */}
             <Box sx={{ 
                '&> :not(style)':
                { 
                    fontSize:"0.8rem"
                }
                }}>
             {/* <Typography sx={{ color:"info.dark", textAlign:"center"}} >You are not registered yet? </Typography>
            <Typography sx={{ color:"info.dark", textAlign:"center"}} > 
            <Link sx={{ textDecoration:"none", cursor:"pointer", '&:hover':{ textDecoration:"underline"}}}>
            Please register here
            </Link>
           
            </Typography> */}
             </Box>

            </Box>
    </Box>
  )
}

export default Login