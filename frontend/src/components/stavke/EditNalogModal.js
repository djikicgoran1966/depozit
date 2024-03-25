import * as React from 'react';
import { useEffect, useState } from 'react'
import { useQuery,useMutation  } from '@apollo/client'
import { KARTICE } from '../../queries/kartice'
import { OZNAKE } from '../../queries/oznake'
import { UPDATESTAVKA } from '../../mutations/stavke';
import {Typography,MenuItem} from '@mui/material';
import { Box, TextField,CircularProgress,Autocomplete, Button,Alert } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GETSUM, PRETRAGA } from '../../queries/stavke';

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

export default function EditNalogModal({closeMenu,nalog}) {
  const [open, setOpen] = React.useState(false);

 
  const [newError, setNewError]= useState(true)
  const [ godina, setGodina ]=useState(nalog.godina)
  const [ broj_izvoda, setBrojIzvoda]=useState(nalog.broj_izvoda)
  const [ datum, setDatum ]=useState(nalog.datum)
  const [ kartica, setKartica]=useState(nalog.kartica)
  const [ korisnik, setKorisnik]=useState(nalog.korisnik)
  const [ deponent, setDeponent]=useState(nalog.deponent)
  const [ oznaka, setOznaka]=useState(nalog.oznaka.naziv==="NN" ? null: nalog.oznaka)
  const [ broj_predmeta, setBrojPredmeta]=useState(nalog.broj_predmeta)
  const [ godina_predmeta, setGodinaPredmeta]=useState(nalog.godina_predmeta)
  const [ duguje, setDuguje]=useState(nalog.duguje)
  const [ potrazuje, setPotrazuje]=useState(nalog.potrazuje)

  const { loading, error, data } = useQuery(KARTICE)
  const { loading:loadingOznake, error:errorOznake, data:dataOznake } = useQuery(OZNAKE)
  
  const [ updateStavka , {error:errorStavka,data:dataStavka}]=useMutation(UPDATESTAVKA,{ refetchQueries:[PRETRAGA, GETSUM]})
  
  if (loadingOznake) return <p>Loading...</p>
  if(loading) return <p>Loading....</p>
  console.log(" Update datum is ,", nalog.datum)
  console.log(" Update potrazuje is ,", nalog.potrazuje)
  const handleOpen = () => {
    setOpen(true)
  };
  const handleCloseModal = () => {
    closeMenu()
    setOpen(false)
  };

  const handleChangeDatum=(e)=>{
 
    if(e===null){
     setDatum("")
    }else {
    setDatum(e.$d)
    } 
   }
   
   const handleChangeGodina=(e)=>{
     
     if(e===null){
      setGodina("")
     }else {
       setGodina(e.$y.toString())
     } 
    }
   

  const handleSubmit=(e)=>{
    e.preventDefault()
    setNewError(true)
   

    // console.log( "type of godina is", typeof(godina))
    // console.log( "type of datum is", typeof(datum),datum.toLocaleString())
    updateStavka( { variables:{ id:nalog._id, newStavka:{godina,broj_izvoda,datum,kartica:kartica===null ? "":kartica._id,deponent,korisnik,oznaka: oznaka===null ? "64dcad2c93eddbd5eb3a32ed":oznaka._id ,broj_predmeta,godina_predmeta,duguje,potrazuje} } } )
    .then(stavka=>{
        console.log("new stavka is ", stavka)
        console.log("Kartica je ", kartica)
        if(stavka.data.createStavka!==null) {
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
         { newError && errorStavka && <pre>  { errorStavka.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
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
             
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer  components={['DatePicker']}>
                <DatePicker disabled slotProps={{ textField: { size: 'small' } }}  onChange={handleChangeGodina} label={'Godina'} views={['year']} value={ dayjs(godina)} />
              </DemoContainer>
            </LocalizationProvider>
           
           <TextField disabled  label="Broj izvoda"
            id=""
            size="small"
            value={ broj_izvoda}
            onChange={ (e)=>setBrojIzvoda(e.target.value) } 
            sx={{ fontSize:"2.5rem"}}
        />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
              <DatePicker disabled slotProps={{ textField: { size: 'small' } }}  onChange={handleChangeDatum} format='DD.MM.YYYY' label="Datum" value={ dayjs(datum)} />
            </DemoContainer>
          </LocalizationProvider>
          </Box>

          <Box  
           sx={{ 
            display:"flex",
            justifyContent:"space-around",
            // border:"1px solid #eee",
            py:3,
            // mb:2,
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
             
                   <Autocomplete
                      size='small'
                      disablePortal
                      // value={oznaka= oznaka.naziv==="NN" ? "": oznaka }
                       value={oznaka}

                      sx={{ width: 300 }}
                      id="combo-box-demo"
                      options= { dataOznake.oznake===null ? [] : dataOznake.oznake }
                      getOptionLabel={(option) => option.naziv}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      renderInput={(params) => <TextField   {...params}  
                      
                       label="Oznaka predmeta" naziv="oznaka" />}
                       onChange={(e,newValue)=>
                        {
                          console.log(newValue)
                        setOznaka(newValue)
                       
                        console.log("Oznaka is ",oznaka)
                        }
                       }
                    />
                     <TextField 
                        label="Broj" 
                        size='small'
                        value={broj_predmeta}
                        onChange={ (e)=>setBrojPredmeta(e.target.value)}
                        sx={{ fontSize:"2.5rem"}}
                        />
                        <TextField 
                        label="Godina" 
                        size="small"
                        value={godina_predmeta}
                        onChange={ (e)=>setGodinaPredmeta(e.target.value)}
                        sx={{ fontSize:"2.5rem"}}
                        />  
           </Box>   

         
         
            <Box  sx={{ 
            display:"flex",
            justifyContent:"space-around",
            // mb:2,
            // border:"1px solid #eee",
            py:3,
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
                  <Autocomplete
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                       value={kartica}
                      options= { data.kartice===null ? [] : data.kartice }
                      getOptionLabel={(option) => option.naziv}
                      // options={ top100Films }
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField    {...params} label="Kartica" naziv="kartica"   />}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      onChange={(e,newValue)=>setKartica(newValue)}
                    />
                     <TextField 
                        label="Korisnik" 
                        size="small"
                        value={korisnik}
                        onChange={ (e)=>setKorisnik(e.target.value)}
                        sx={{ fontSize:"2.5rem"}}
                        />
                        <TextField 
                        label="Deponent" 
                        size="small"
                        value={deponent}
                        onChange={ (e)=>setDeponent(e.target.value)}
                        sx={{ fontSize:"2.5rem"}}
                        />  
            </Box>
              
            <Box  sx={{ 
            display:"flex",
            justifyContent:"space-around",
            // mb:2,
            // border:"1px solid #eee",
            py:3,
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
              <TextField 
            label="Duguje" 
            size="small"
            value={duguje}
            onChange={ (e)=>setDuguje(e.target.value)}
            sx={{ fontSize:"2.5rem"}}
            />  <TextField 
            label="Potražuje" 
            size="small"
            value={potrazuje}
            onChange={ (e)=>setPotrazuje(e.target.value)}
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