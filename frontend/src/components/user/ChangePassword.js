import { Box, TextField,Typography, Button,Alert } from '@mui/material'
import React,{ useState,useContext} from 'react'
import { useMutation } from '@apollo/client'
import { CHANGE_PASSWORD } from '../../mutations/user'
import AuthContext from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [ newError, setNewError]=useState(true)
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const[messages,setMessages]=useState([])
    // const [messages, setMessages] = useState([]);
  
    const context=useContext(AuthContext)
    const navigate=useNavigate()

    const [changePassword, { error,data }] = useMutation(CHANGE_PASSWORD);

    const timeout =()=> {
      (navigate("/"));
    }

    const handleChangePassword=(e)=>{
        e.preventDefault()
        setNewError(true)
        changePassword({
            variables: {
              id: context.id,
              password,
              newPassword,
              confirmation,
            },
          })
            .then((result) => {
              console.log("RESULT", result);
              setPassword("");
              setNewPassword("");
              setConfirmation("");
              setNewError(false)
              setMessages([]);
              notify()
              setTimeout(timeout,2000)
              
              //   props.history.push("/")
            })
            .catch((err) => setMessages(err.graphQLErrors));
    
    }

    const notify = () => toast("Uspešno ste promenili lozinku");

  return (
    <Box sx={{ width:"vw", height:"94vh", boxSizing:"border-box", backgroundColor:"#eee",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
     }} >

            <Box sx={{ width:"420px",
             
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
                      <ToastContainer autoClose="1000" />
                      </Box>

                <Box component="img" src="password.jpeg" width="181px" height="135px" /> 
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

               
                <Typography >Promena lozinke</Typography>
                </Box>
               
             <TextField value={password}  type="password" size='small' label="Lozinka" onChange={(e)=>setPassword(e.target.value)} ></TextField>
             <TextField value={newPassword}  type="password" size='small' label="Nova lozinka" onChange={ (e)=>setNewPassword(e.target.value) } ></TextField>
             <TextField value={confirmation} type="password" size='small' label="Potvrda nove lozinke" onChange={ (e)=>setConfirmation(e.target.value) } ></TextField>

             <Button variant="outlined" color="success" onClick={handleChangePassword} >Promeni</Button>
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

export default ChangePassword