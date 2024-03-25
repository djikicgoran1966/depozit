import { useState } from 'react';
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATEITEM } from '../../mutations/items'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Typography,MenuItem, TextField,Alert} from '@mui/material';
import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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

export default function EditItemModal({closeMenu,item}) {
  const [open, setOpen] = useState(false);
  const [ naziv,setNaziv]=useState(item.naziv)
  const [datum,setDatum]=useState(item.datum)
  const [price, setPrice]=useState(item.price)
  const [ newQuery, setNewQuery]=useState(false)
  const handleOpen = () => {
    setOpen(true)
  };
  const handleCloseModal = () => {
    closeMenu()
    setOpen(false)
    setNewQuery(false)
  };

  const [ updateItem, {data, loading, error} ] =useMutation(UPDATEITEM, { refetchQueries:[
  
  ] }) 

  const handleUpdate=(e)=>{
    e.preventDefault()
    setNewQuery(true)
    updateItem({ variables:{_id:item._id,naziv,datum,price}  })
    .then(result=>{
      setDatum(item.datum)
      setNaziv(item.naziv)
      setPrice(item.price)
      handleCloseModal()
    })
    .catch(err=>console.log("Error updating item, ",err))
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <MenuItem onClick={handleOpen}  sx={{ fontSize:"1.5rem", width:"200px" }} >  <EditOutlinedIcon sx={{ mr:2}} /> <span> Edit </span>  </MenuItem>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontWeight:100,my:2,textAlign:"center"}} variant="h4">Update item</Typography>
          { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }

         <Box sx={{
          '&> :not(style)':{
            width:"100%",
            mb:2
      
          }
         }}>
         <TextField size='small' value={naziv} 
          onChange={ (e)=>setNaziv(e.target.value) }
         label="Naziv" />
         <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
              <DatePicker  sx={{ width:"100%"}} slotProps={{ textField: { size: 'small' } }}  onChange={(newValue) => setDatum(newValue)} format='DD.MM.YYYY' label="Datum" value={ dayjs(datum)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField size="small" value={ price} 
           onChange={(e)=>setPrice(e.target.value)}
           label="Price" />
           <Box sx={{
            '&> :not(style)':{
              width:"100%",
              mb:2
            }
           }}>
           <Button onClick={ handleUpdate} variant="outlined" color="success">Update</Button>
           <Button onClick={ handleCloseModal } variant='outlined' color="warning" >Cancel</Button>
           </Box>
          
         </Box>
         
        </Box>
      </Modal>
    </div>
  );
}