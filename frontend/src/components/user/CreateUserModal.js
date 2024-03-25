import * as React from 'react';
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER  } from '../../mutations/user'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { CircularProgress, TextField } from '@mui/material';
import { FINDNKARTICE, KARTICE } from '../../queries/kartice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_USERS } from '../../queries/user';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateUserModal() {
  const [open, setOpen] = React.useState(false);
  const [ firstName, setFirstName]=useState("")
  const [ lastName, setLastName]=useState("")
  const [ email, setEmail]=useState("")
  const [ password, setPassword]=useState("")
  const [ newQuery, setNewQuery]=useState(true)
  const handleOpen = () => setOpen(true);
 
  const handleClose = () => {
    setOpen(false);
    setNewQuery(false)
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")

  }
 
   const handleSubmit=(e)=>{
    e.preventDefault()
    setNewQuery(true)
    createUser( {variables:{ userInput :{ firstName,lastName,email,password}}})
    .then(user=>{
        console.log("Error is", error)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        notify()
        //  if ( !newQuery|| !error ||  !error.graphQLErrors ) {
        //   handleClose()
        //  }
        setNewQuery(false)
        handleClose()
        
    })
    .catch(err=>console.log("Error is occured:", err))
   
   }

  const [ createUser, {data, loading, error} ] =useMutation(ADD_USER, { refetchQueries:[
    GET_USERS
  ] }) 

  if (loading) return <CircularProgress />
  const notify = () => toast("Uspešno ste dodali korisnika");
  return (
    <div>

      <Button variant="outlined" color="inherit" onClick={handleOpen}> Dodaj korisnika </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
          <Box sx={{ display:"flex", justifyContent:"center"}}>
          <Box component="img" src="user.png" width="120px" height="120px" />
          </Box>
          <Typography sx={{ textAlign:"center", color:"#8d6e63", fontWeight:100, fontSize:"1.25rem"}} id="modal-modal-title" variant="h6" component="h2">
           Nov korisnik
          </Typography>
           <Box sx={{ width:"100%", mx:"auto"}}>
           <TextField 
            size="small"
             value={ firstName}
             onChange={(e)=>setFirstName(e.target.value)}
             sx={{
             width:"100%",
             mt:5,
            mb:2}}
             label="Ime">

            </TextField>
            <TextField 
           size="small"
             value={ lastName}
             onChange={(e)=>setLastName(e.target.value)}
             sx={{
             width:"100%",
             mb:2
             }}
             label="Prezime">

            </TextField>
            <TextField 
           size="small"
             value={ email}
             onChange={(e)=>setEmail(e.target.value)}
             sx={{
             width:"100%",
             mb:2
             }}
             label="E mail">

            </TextField>
            <TextField 
            type='password'
            size="small"
             value={ password}
             onChange={(e)=>setPassword(e.target.value)}
             sx={{
             width:"100%",
             mb:2
             }}
             label="Lozinka">

            </TextField>
           <Box sx={{
            display:"flex",
            justifyContent:"space-between",
            boxSizing:"border-box",
            '&> :not(style)':{
                width:"45%",
            }
           }}>
           <Button variant="outlined" color="inherit" onClick={handleSubmit}>Dodaj</Button>
           <Button variant="outlined" onClick={handleClose} color="inherit">Odustani</Button>
           </Box>
           
           </Box>
          
          
        </Box>
      </Modal>
    </div>
  );
}