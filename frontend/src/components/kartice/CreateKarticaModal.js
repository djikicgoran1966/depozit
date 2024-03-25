import * as React from 'react';
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATEKARTICA } from '../../mutations/kartice'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { CircularProgress, TextField } from '@mui/material';
import { FINDNKARTICE, KARTICE } from '../../queries/kartice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function CreateKarticaModal() {
  const [open, setOpen] = React.useState(false);
  const [ naziv, setNaziv]=useState("")
  const [ newQuery, setNewQuery]=useState(false)
  const handleOpen = () => setOpen(true);
 
  const handleClose = () => {
    setOpen(false);
    setNewQuery(false)
    setNaziv("")

  }
 
   const handleSubmit=(e)=>{
    e.preventDefault()
    setNewQuery(true)
    createKartica( {variables:{naziv:naziv}})
    .then(kartica=>{
        console.log("Error is", error)
        setNaziv("")
        notify()
        //  if ( !newQuery|| !error ||  !error.graphQLErrors ) {
        //   handleClose()
        //  }
        handleClose()
        
    })
    .catch(err=>console.log("Error is occured:", err))
   
   }

  const [ createKartica, {data, loading, error} ] =useMutation(CREATEKARTICA, { refetchQueries:[
    KARTICE, FINDNKARTICE
  ] }) 

  if (loading) return <CircularProgress />
  const notify = () => toast("Uspešno ste sačuvali podatke");
  return (
    <div>

      <Button variant="outlined" color="inherit" onClick={handleOpen}> Dodaj karticu </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
       
          <Typography sx={{ textAlign:"center", color:"#8d6e63", fontWeight:100, fontSize:"1.25rem"}} id="modal-modal-title" variant="h6" component="h2">
           Nova kartica
          </Typography>
           <Box sx={{ width:"85%", mx:"auto"}}>
           <TextField 
           size="small"
             value={ naziv}
             onChange={(e)=>setNaziv(e.target.value)}
             sx={{
             width:"100%",
             my:5}}
             label="Naziv">

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