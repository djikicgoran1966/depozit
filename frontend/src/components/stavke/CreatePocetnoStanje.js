import React, { useState,useEffect,useRef} from 'react'
import { useQuery,useMutation,useLazyQuery } from '@apollo/client'
import PrintComponents from 'react-print-components'
import NalogPrint from './NalogPrint'
import {KARTICE}  from "../../queries/kartice"
// import { OZNAKE } from '../../queries/oznake'
import { CREATESTAVKA} from '../../mutations/stavke'
import { FINDNALOG, GETSUM } from '../../queries/stavke'
import { Box, TextField,CircularProgress,Autocomplete, Button,Alert, List, ListItem,Grid, Divider,Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CreateKarticaModal from '../kartice/CreateKarticaModal'
import dayjs from 'dayjs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NalogDetails from './NalogDetails'
import Nalog from './Nalog'
import Stanje from './Stanje'
import { redirect } from 'react-router-dom'



const CreatePocetnoStanje = () => {
  
  console.log("Rerendered")

  //  const duguje=useRef("Miloš")
  //  const potrazuje=useRef("")
 
  const [ nalog,setNalog]=useState([])  
  const [newError, setNewError]= useState(true)
  const [ godina, setGodina ]=useState("")
  const [ broj_izvoda, setBrojIzvoda]=useState("")
  const [ datum, setDatum ]=useState("")
   const [ kartica, setKartica]=useState(null)
  const [ korisnik, setKorisnik]=useState("")
  const [ deponent, setDeponent]=useState("")
  const [ oznaka, setOznaka]=useState(null)
  const [ broj_predmeta, setBrojPredmeta]=useState("")
  const [ godina_predmeta, setGodinaPredmeta]=useState("")
  // const [ duguje, setDuguje]=useState("")
  // const [ potrazuje, setPotrazuje]=useState("")
  const [ search,setSearch]=useState(false)
  
  // const [chooseKartica, setChooseKartica]=useState(false)

  const [ dugujeSum, setDugujeSum ]=useState(0)
  const [ potrazujeSum, setPotrazujeSum ]=useState(0)
  const [ length,setLength]=useState(0)

  const dugujeInputRef = useRef();
  const potrazujeInputRef = useRef();
  const karticaInputRef=useRef(null)

  const { loading, error, data } = useQuery(KARTICE)
  const [ findNalog,{loading:loadingNalog, error:errorNalog, data:dataNalog}]  = useLazyQuery(FINDNALOG,{
   
    onCompleted:(dataNalog)=>{
      console.log("Completed...", dataNalog)
      if(dataNalog.findNalog!==null){
        console.log("Really Completed...",dataNalog)
        setNalog(dataNalog.findNalog)
        let dSum=0
        let pSum=0
       setLength(dataNalog.findNalog.length)
       for (let i=0; i<dataNalog.findNalog.length;i++){
           dSum=dSum+parseFloat(dataNalog.findNalog[i].duguje)
           pSum=pSum+parseFloat(dataNalog.findNalog[i].potrazuje)
       }
       setDugujeSum(dSum)
       setPotrazujeSum(pSum) 
      
      }
    }
  } )
  //  const {loading:loadingNalog, error:errorNalog, data:dataNalog}  = useQuery(FINDNALOG, { variables:{godina,broj:broj_izvoda,datum}})
  // const {loading:loadingNalog, error:errorNalog, data:dataNalog}  = useQuery(FINDNALOG, { variables:{godina,broj:broj_izvoda,datum}})

  // const { loading:loadingOznake, error:errorOznake, data:dataOznake } = useQuery(OZNAKE)

  const [ createStavka , {error:errorStavka,data:dataStavka}]=useMutation(CREATESTAVKA, { refetchQueries:[FINDNALOG,GETSUM]},  {errorPolicy:'all'})



  useEffect(() => {
   
    findNalog({variables:{godina,broj:broj_izvoda,datum}}) 
  },[godina,broj_izvoda,datum]);


  if(loading){
    return <p>Loading...</p>
  }
  
 

const handleChangeGodina=(e)=>{
if(e===null){
  setGodina("")
 }else {
   setGodina(e.$y.toString())
 }
 
}

const handleBrojIzvoda=(e) => {
  setBrojIzvoda(e.target.value);
}




const handleChangeDatum=(e)=>{
if(e===null){
  setDatum("")
 }else {
 setDatum(e.$d)
 } 
 
}

const handleChangeDuguje= e=>{
//   setDuguje(e.target.value)
 }

const handleChangePotrazuje=e=>{
  // setPotrazuje(e.target.value)
}
      
   


  const notify = () => toast("Uspešno ste sačuvali podatke");

  const reset=()=>{
    setGodina("")
    setBrojIzvoda("")
    setDatum("")
    setKartica(null)
     
    // setKorisnik("")
    // setDeponent("")
    // setOznaka(null)
    // setBrojPredmeta("")
    // setGodinaPredmeta("")
    // setDuguje("")
    // setPotrazuje("")
    setNewError(false)
   
  }

  


 const handleSubmit=(e)=>{
  e.preventDefault()
  console.log("Kartica ref je, ",karticaInputRef)
  const duguje=dugujeInputRef.current.value
  const potrazuje=potrazujeInputRef.current.value
 // const kartica=karticaInputRef.current.value
 
  setNewError(true)
   const input={godina,broj_izvoda,datum,kartica:kartica===null ? "":kartica._id,deponent,korisnik,oznaka: oznaka===null ? "64dcad2c93eddbd5eb3a32ed":oznaka._id ,broj_predmeta,godina_predmeta,duguje,potrazuje}
  
  createStavka( { variables:{ stavkaInput:input} }  )
  .then(stavka=>{
      console.log("new stavka is ", stavka)
      console.log("Kartica je ", kartica)
      
      if(stavka.data.createStavka!==null) {
        setKartica(null)
        
        // setKorisnik("")
        // setDeponent("")
        // setOznaka(null)
        // setBrojPredmeta("")
        // setGodinaPredmeta("")
        dugujeInputRef.current.value=null
        potrazujeInputRef.current.value=null
        setKartica(null)
        // setChooseKartica(true)
        // karticaInputRef.current.value=null
        notify()
        setSearch(true)
      }
      
  })
  .catch(err=>console.log("Error is occured:", err))
  
 }

 

  return (
     <Box sx={{
      maxWidth:"xl",
      mx:"auto"
    }}>
        <Box sx={{ display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{ fontWeight:100, fontSize:"1.25rem",color:"#8d6e63"}}  > Početno stanje    </Typography> 
        <Stanje/>
        </Box>
        <Divider sx={{ mb:5}} />
        <Box sx={{
          display:"flex",
          justifyContent:"flex-end",
         
          mr:2
        }}>
        <CreateKarticaModal  />
       

        </Box>
         <Box sx={{
          // maxWidth:"md",
          // // mx:"auto"
         }}>
         { newError && errorStavka && <pre>  { errorStavka.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
         <ToastContainer />
         </Box>
    <Box sx={{
      // maxWidth:"md",
      // mx:"auto",
      // mt:3,
      '&> :not(style)':{
        pb:3,
        px:3,
      }
    }}>
          <Box   sx={{ 
            display:"flex",
            py:3,
            // justifyContent:"space-around",
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
             
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer  components={['DatePicker']}>
                <DatePicker slotProps={{ textField: { size: 'small' } }}  onChange={handleChangeGodina} label={'Godina'} views={['year']} value={ dayjs(godina)} />
              </DemoContainer>
            </LocalizationProvider>
           
           <TextField  label="Broj izvoda"
            id=""
            size="small"
            value={ broj_izvoda}
            onChange={ handleBrojIzvoda } 
            sx={{ fontSize:"2.5rem"}}
        />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small' } }}  onChange={handleChangeDatum} format='DD.MM.YYYY' label="Datum" value={ dayjs(datum)} />
            </DemoContainer>
          </LocalizationProvider>
          
          </Box>
         
            
              
            <Box  sx={{ 
            display:"flex",
            // justifyContent:"space-around",
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
                      // options= { data.kartice===null ? [] : {karticaInputRef} }
                       getOptionLabel={(option) => option.naziv}
                      // options={ top100Films }
                      sx={{ width: 300 }}
                       renderInput={ (params) => <TextField     {...params} label="Kartica" naziv="kartica"   />}
                       onChange={(e,newValue)=>setKartica(newValue)}
                       preventDefault
                     //  onChange={(e,newValue)=>kartica=newValue}
                       
                    />
              <TextField 
                type='text'
                label="Duguje" 
                size="small"
                // value={duguje}
                // onChange={ (e)=>setDuguje(e.target.value)}
                // onChange ={ handleChangeDuguje}
                sx={{ fontSize:"2.5rem"}}
                inputRef={dugujeInputRef}
               /> 
            <TextField 
            
            label="Potražuje" 
            size="small"
            // value={potrazuje}
            // onChange={ (e)=>(potrazuje.current=e.target.value)}
            // onChange ={ handleChangePotrazuje}
            sx={{ fontSize:"2.5rem"}}
            inputRef={potrazujeInputRef}
            />
            </Box>
            <Box sx={{
             display:"flex",
             py:3,
             '&> :not(style)':{
               width:"150px" 
              }
            }}>
              <Button sx={{ mr:3}} variant="outlined" color="inherit" onClick={ handleSubmit } >Sačuvaj</Button>
              <Button variant="outlined" color="inherit" onClick={ reset } >Obriši</Button>
            </Box>
          
            </Box>
            
          {/* <Box>
           
            
          </Box> */}
                

                     { length===0 ? "" :
                     <Box >
                      <Box sx={{ 
                  
                  mb:2,      
                  maxWidth:"lg",
                  display:"flex",
                  justifyContent:"end",
                  alignItems:"center",
                 
                  '&> :not(style)':{
                    ml:2,
                    mt:2,
                    // backgroundColor:"warning.main",
                    color:"white",
                    borderRadius:1,
                    p:1
                  }
                  }}>
                    <Box>
                    <PrintComponents  trigger={ <Button color="success" variant='contained' >Štampa</Button>  } >
                        <NalogPrint nalog={nalog} godina={ godina} broj_izvoda={ broj_izvoda} datum={datum} dugujeSum={dugujeSum} potrazujeSum={potrazujeSum} length={length} />
                     </PrintComponents>
          
                    </Box>
                    <Box sx={{backgroundColor:"info.main"}}>
                 Stavki:   { length}
                    </Box>
                    <Box  sx={{backgroundColor:"warning.main"}}>
                   Duguje: { dugujeSum  }
                    </Box>
                    <Box  sx={{backgroundColor:"success.main"}}>
                    Potražuje: { potrazujeSum }
                      </Box>        
                  </Box>
                     <Box>
                    <ListItem sx={{ maxWidth:"lg", backgroundColor:"#eee"}} compoment="Grid" container> 
                    <Grid item xs={2}>
                    Broj predmeta
                    </Grid>
                    <Grid item xs={3}>
                    Kartica
                    </Grid>
                    <Grid item xs={2}>
                    Korisnik
                    </Grid> 
                    <Grid item xs={2}>
                    Deponent
                    </Grid>
                    <Grid item xs={1}>
                    Duguje
                    </Grid>
                    <Grid item xs={1}>
                     Potražuje
                    </Grid> 
                    
                    
                </ListItem>
                </Box>
                </Box>
                  
                  }

                  {/* <Nalog nalog={nalog} /> */}

                   {    
                         
                    nalog.map(result=>{ 
                      console.log("Map function")   
                    return <NalogDetails key={ result._id} nalog={result}  /> 
                    }) 
                    } 
               
                    
    </Box>
  )
}

export default CreatePocetnoStanje