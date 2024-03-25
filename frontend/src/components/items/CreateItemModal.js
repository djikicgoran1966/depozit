import * as React from 'react';
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATEITEM } from '../../mutations/items'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress, TextField } from '@mui/material';
import { ITEMS } from '../../queries/items';

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [ naziv, setNaziv]=useState("")
  const [ datum, setDatum]=useState("")
  const [ price, setPrice]=useState("")
  const [ newQuery, setNewQuery]=useState(false)
  const handleOpen = () => setOpen(true);
 
  const handleClose = () => {
    setOpen(false);
    setNewQuery(false)
    setNaziv("")
    setDatum("")
    setPrice("")

  }
 
   const handleSubmit=(e)=>{
    e.preventDefault()
    setNewQuery(true)
    createItem( {variables:{naziv:naziv,datum:datum, price}})
    .then(item=>{
        console.log("Error is", error)
        // setNaziv("")
        // setDatum("")
        // setPrice("")
        //  if ( !newQuery|| !error ||  !error.graphQLErrors ) {
        //   handleClose()
        //  }
        handleClose()
        
    })
    .catch(err=>console.log("Error is occured:", err))
   
   }

  const [ createItem, {data, loading, error} ] =useMutation(CREATEITEM, { refetchQueries:[
    ITEMS
  ] }) 

  if (loading) return <CircularProgress />
  return (
    <div>

      <Button variant="contained" color="info" onClick={handleOpen}> Dodaj item </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }

          <Typography sx={{ textAlign:"center", color:"info.dark", fontWeight:100, fontSize:"1.25rem"}} id="modal-modal-title" variant="h6" component="h2">
           Nov item
          </Typography>
           <Box sx={{ width:"85%", mx:"auto"}}>
           <TextField 
             value={ naziv}
             onChange={(e)=>setNaziv(e.target.value)}
             sx={{
             width:"100%",
             my:5}}
             label="Naziv">

            </TextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker  onChange={(newValue) => setDatum(newValue)} format='DD.MM.YYYY' label="Datum" value={datum} />
            </DemoContainer>
          </LocalizationProvider>

          <TextField 
             value={ price}
             onChange={(e)=>setPrice(e.target.value)}
             sx={{
             width:"100%",
             my:5}}
             label="Price">

            </TextField>
           <Box sx={{
            display:"flex",
            justifyContent:"space-between",
            boxSizing:"border-box",
            '&> :not(style)':{
                width:"45%",
            }
           }}>
           <Button variant="contained" color="info" onClick={handleSubmit}>Dodaj</Button>
           <Button variant="contained" onClick={handleClose} color="error">Odustani</Button>
           </Box>
           
           </Box>
          
          
        </Box>
      </Modal>
    </div>
  );
}