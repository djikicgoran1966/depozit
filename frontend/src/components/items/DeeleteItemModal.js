import * as React from 'react';
import { useEffect,useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETEITEM} from '../../mutations/items'
import { ITEMS } from '../../queries/items';
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
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontWeight:100
};

export default function DeleteItemModal({closeMenu, item}) {
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

  const handleDeleteItem=()=>{
    setNewQuery(true)
    deleteItem( { variables:{_id:item._id} }, { refetchQueries:[
        ITEMS
    ]})
    .then(result=>{
        console.log(result)
        if ( !newQuery || !error ||  !error.graphQLErrors) {
          handleCloseModal()
         }
    })
    .catch(err=>console.log(err))
  }


  const [ deleteItem, {data, loading, error} ] =useMutation(DELETEITEM, { refetchQueries:[
    ITEMS
  ] }) 
  if (loading) return <CircularProgress />
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <MenuItem onClick={handleOpen}  sx={{ fontSize:"1.5rem", width:"200px", color:"secondary.main" }} >  <DeleteOutlinedIcon sx={{ mr:2}} /> <span> Delete </span>  </MenuItem>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> < Alert key={i} severity="error">  { message} </Alert> )} </pre> }

          {/* <Typography sx={{ textAlign:"center", my:3, fontWeight:100}} variant="h4" >Brisanje kartice</Typography> */}
          <Typography sx={{ textAlign:"center"}} id="modal-modal-title" variant="h5" component="h2" >
            Da li ste sigurni da želite da obrišete item : <Box sx={{ fontWeight:"bold", textAlign:"center" }}> { item.naziv} ?</Box> 
          </Typography>
           <Box sx={{mt:3,px:"10%",
            '&> :not(style)':{
              width:"45%",
              textTransform:"capitalize",
              fontSize:"1.3rem",
              fontWeight:100
            }
          }}>
            <Button onClick={ handleDeleteItem } sx={{ mr:4}} variant="contained" color="secondary"> Da</Button>
            <Button onClick={ handleCloseModal} variant="contained" color="warning">Odustani</Button>
           </Box>
        </Box>
      </Modal>
    </div>
  );
}