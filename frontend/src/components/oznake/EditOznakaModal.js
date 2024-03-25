import  { useState} from 'react';
import { useMutation } from '@apollo/client';
import { OZNAKE } from '../../queries/oznake';
import { UPDATEOZNAKA} from '../../mutations/oznake';
import {Box, Alert} from '@mui/material';
import Button from '@mui/material/Button';
import {Typography,MenuItem, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


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

export default function EditKarticaModal({closeMenu,oznaka}) {
  const [open, setOpen] = useState(false);
  const [ naziv,setNaziv]=useState(oznaka.naziv)
  const [ newQuery, setNewQuery]=useState(false)
  
  const [ updateOznaka, {data, loading, error} ] =useMutation(UPDATEOZNAKA, { refetchQueries:[
    OZNAKE
  ] }) 
  
  const handleOpen = () => {
    setOpen(true)
  };
  const handleCloseModal = () => {
    closeMenu()
    setOpen(false)
  };

  const handleUpdateOznaka=()=>{
    setNewQuery(true)
    updateOznaka( { variables:{id:oznaka._id,naziv} }, { refetchQueries:[
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
        { newQuery && error && <pre>  { error.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }

          <Typography sx={{ textAlign:"center", fontSize:"1.25rem", fontWeight:100}} >Promena podataka</Typography>
          <TextField 
             value={ naziv}
             onChange={(e)=>setNaziv(e.target.value)}
             sx={{
             width:"100%",
             my:5}}
             label="Naziv"
             size="small"
             >

            </TextField>
            <Box sx={{
            display:"flex",
            justifyContent:"space-between",
            boxSizing:"border-box",
            '&> :not(style)':{
                width:"45%",
            }
           }}>
           <Button variant="outlined" size="small" color="inherit" onClick={handleUpdateOznaka}>Promeni</Button>
           <Button variant="outlined" size="small" onClick={handleCloseModal} color="inherit">Odustani</Button>
           </Box>
        </Box>
      </Modal>
    </div>
  );
}