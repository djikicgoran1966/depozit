import * as React from 'react';
import { useEffect,useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETEOZNAKA} from '../../mutations/oznake'
import { OZNAKE } from '../../queries/oznake';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Typography,MenuItem, CircularProgress,Alert} from '@mui/material';
import Modal from '@mui/material/Modal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
  fontWeight:100
};

export default function DeleteOznakaModal({closeMenu, oznaka}) {
  const [open, setOpen] = React.useState(false);
  const [ newQuery, setNewQuery]=useState(false)
 
  const handleOpen = () => {
    setOpen(true)
  };
  const handleCloseModal = () => {
    closeMenu()
    setOpen(false)
    setNewQuery(false)
  };

  const handleDeleteOznaka=()=>{
    setNewQuery(true)
    deleteOznaka( { variables:{id:oznaka._id} }, { refetchQueries:[
        OZNAKE
    ]})
    .then(result=>{
        console.log(result)
        if ( !newQuery || !error ||  !error.graphQLErrors) {
          handleCloseModal()
         }
    })
    .catch(err=>console.log(err))
  }


  const [ deleteOznaka, {data, loading, error} ] =useMutation(DELETEOZNAKA, { refetchQueries:[
    OZNAKE
  ] }) 
  if (loading) return <CircularProgress />
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <MenuItem onClick={handleOpen}  sx={{  width:"200px", color:"secondary.main" }} >  <DeleteOutlinedIcon sx={{ mr:2}} /> <span> Brisanje </span>  </MenuItem>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> < Alert key={i} severity="error">  { message} </Alert> )} </pre> }

          {/* <Typography sx={{ textAlign:"center", my:3, fontWeight:100}} variant="h4" >Brisanje kartice</Typography> */}
          <Typography sx={{ textAlign:"center"}}  id="modal-modal-title"  component="h2" >
            Da li ste sigurni da želite da obrišete oznaku : <Box sx={{ fontWeight:"bold", textAlign:"center" }}> { oznaka.naziv} ?</Box> 
          </Typography>
           <Box sx={{
            display:"flex",
            mt:2,
            justifyContent:"space-between",
            boxSizing:"border-box",
            '&> :not(style)':{
                width:"45%",
            }
          }}>
            <Button onClick={ handleDeleteOznaka } size="small" sx={{ mr:4}} variant="outlined" color="inherit"> Da</Button>
            <Button onClick={ handleCloseModal} size="small" variant="outlined" color="inherit">Odustani</Button>
           </Box>
        </Box>
      </Modal>
    </div>
  );
}