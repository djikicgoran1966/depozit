import * as React from 'react';
import { useEffect,useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETESTAVKA} from '../../mutations/stavke'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Typography,MenuItem, CircularProgress,Alert} from '@mui/material';
import Modal from '@mui/material/Modal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { GETSUM } from '../../queries/stavke';

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

export default function DeleteNalogModal({closeMenu, nalog}) {
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

  const handleDeleteNalog=()=>{
    setNewQuery(true)
    console.log("Id is ", nalog._id)
    deleteStavka( { variables:{id:nalog._id} })
    .then(result=>{
        console.log(result)
        if ( !newQuery || !error ||  !error.graphQLErrors) {
          handleCloseModal()
         }
    })
    .catch(err=>console.log(err))
  }


  const [ deleteStavka, {data, loading, error} ] =useMutation(DELETESTAVKA, { refetchQueries:[GETSUM]})
  if (loading) return <CircularProgress />
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <MenuItem onClick={handleOpen}  sx={{ fontSize:"1rem", width:"200px", color:"secondary.main" }} >  <DeleteOutlinedIcon sx={{ mr:2}} /> <span> Brisanje </span>  </MenuItem>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> < Alert key={i} severity="error">  { message} </Alert> )} </pre> }

          {/* <Typography sx={{ textAlign:"center", my:3, fontWeight:100}} variant="h4" >Brisanje kartice</Typography> */}
          <Typography sx={{ textAlign:"center"}} id="modal-modal-title"   >
            Da li ste sigurni da želite da obrišete stavku ?  
          </Typography>
           <Box sx={{mt:3,px:"10%",
            '&> :not(style)':{
              width:"45%",
              textTransform:"capitalize",
              fontSize:"1rem",
              fontWeight:100
            }
          }}>
            <Button onClick={ handleDeleteNalog } sx={{ mr:4}} variant="outlined" color="inherit"> Da</Button>
            <Button onClick={ handleCloseModal} variant="outlined" color="inherit">Odustani</Button>
           </Box>
        </Box>
      </Modal>
    </div>
  );
}