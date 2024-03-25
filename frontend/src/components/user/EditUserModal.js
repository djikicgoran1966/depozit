import * as React from 'react';
import { useEffect, useState } from 'react'
import { useQuery,useMutation  } from '@apollo/client'
import { UPDATE_USER } from '../../mutations/user';
import {Typography,MenuItem} from '@mui/material';
import { Box, TextField,CircularProgress,Autocomplete, Button,Alert } from '@mui/material'

import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GET_USERS } from '../../queries/user';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditUserModal({closeMenu,user}) {
  const [open, setOpen] = React.useState(false);

 
  const [newError, setNewError]= useState(true)
  const [ firstName, setFirstName ]=useState(user.firstName)
  const [ lastName, setLastName]=useState(user.lastName)
  const [ email, setEmail ]=useState(user.email)

  
 
  
  
  const [ updateUser , {error,data}]=useMutation(UPDATE_USER,{ refetchQueries:[GET_USERS]})
  

  const handleOpen = () => {
    setOpen(true)
  };
  const handleCloseModal = () => {
    closeMenu()
    setOpen(false)
  };

  
   

  
   

  const handleSubmit=(e)=>{
    e.preventDefault()
    setNewError(true)
   

    // console.log( "type of godina is", typeof(godina))
    // console.log( "type of datum is", typeof(datum),datum.toLocaleString())
    updateUser( { variables:{id:user._id, firstName,lastName,email } } )
    .then(user=>{
      
      
        if(user.data.updateUser!==null) {
        //   setKartica(null)
        //   setKorisnik("")
        //   setDeponent("")
        //   setOznaka(null)
        //   setBrojPredmeta("")
        //   setGodinaPredmeta("")
        //   setDuguje("")
        //   setPotrazuje("")
        //   notify()
          // handleFindNalog()
        //   setSearch(true)
        handleCloseModal()
        }
        
    })
    .catch(err=>console.log("Error is occured:", err))
   
   }



  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <MenuItem onClick={handleOpen}  sx={{ fontSize:"1rem", width:"200px" }} >  <EditOutlinedIcon sx={{ mr:2}} /> <span> Promena </span>  </MenuItem>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign:"center", fontWeight:100}}>Promena podataka</Typography>
          <Box sx={{
          maxWidth:"md",
          // // mx:"auto"
         }}>
         { newError && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
         {/* <ToastContainer /> */}
         </Box>
    <Box sx={{
      maxWidth:"md",
      // mx:"auto",
      // mt:3,
      '&> :not(style)':{
        pb:3,
        px:3,
      }
    }}>
          <Box   sx={{ 
            display:"flex",
            // mb:2,
            // borderLeft:"15px solid #eee",
            // borderRight:"15px solid #eee",
            py:3,
            justifyContent:"space-around",
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
             
       
       
           
           <TextField   label="Ime"
            id=""
            size="small"
            value={ firstName}
            onChange={ (e)=>setFirstName(e.target.value) } 
            sx={{ fontSize:"2.5rem"}}
            />
         <TextField  label="Prezime"
            id=""
            size="small"
            value={ lastName}
            onChange={ (e)=>setLastName(e.target.value) } 
            sx={{ fontSize:"2.5rem"}}
            />
             <TextField  label="E mail"
            id=""
            size="small"
            value={ email}
            onChange={ (e)=>setEmail(e.target.value) } 
            sx={{ fontSize:"2.5rem"}}
            />
       
          </Box>

         

         
         
            
              
         
         
            <Box sx={{
              display:"flex",
              justifyContent:"space-around",
              // border:"1px solid #eee",
              py:3,
              '&> :not(style)':{
                width:"150px"
                
              }
            }}>
              <Button variant="outlined" color="inherit" onClick={ handleSubmit } >Sačuvaj</Button>
              <Button variant="outlined" color="inherit" onClick={ handleCloseModal } >Odustani</Button>
            </Box>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}