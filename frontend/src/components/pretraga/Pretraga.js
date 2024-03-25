import React, { useState, useEffect} from 'react'
import { useQuery,useLazyQuery } from '@apollo/client'
import { KARTICE } from '../../queries/kartice'
import { OZNAKE } from '../../queries/oznake'
import { PRETRAGA } from '../../queries/stavke'
import { STAVKE } from '../../queries/stavke'
import dayjs from 'dayjs'
import { Box, Autocomplete, TextField,Button, IconButton,Typography, Divider } from '@mui/material'
import ClearIcon from '@mui/icons-material/ClearOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AppPagination from './AppPagination'
import Stanje from '../stavke/Stanje'

const Pretraga = () => {

  
  

    const [ stavke,setStavke]=useState([])  
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
    const [ duguje, setDuguje]=useState("")
    const [ potrazuje, setPotrazuje]=useState("")
   
    const [ dugujeSum,setDugujeSum]=useState(0)
    const [ potrazujeSum, setPotrazujeSum]=useState(0)
   
    const [ length, setLength]=useState(0)

    const { loading, error, data } = useQuery(KARTICE)
    const { loading:loadingOznake, error:errorOznake, data:dataOznake } = useQuery(OZNAKE)

    const [ pretraga,{loading:loadingNalog, error:errorNalog, data:dataStavke}]  = useLazyQuery(PRETRAGA,   {onCompleted:(dataStavke)=>{
      // console.log("Pretraga started")
     
      if(dataStavke){
        let dSum=0
        let pSum=0
         setLength(dataStavke.pretraga.length)
         for (let i=0; i<dataStavke.pretraga.length;i++){
             dSum=dSum+parseFloat(dataStavke.pretraga[i].duguje)
             pSum=pSum+parseFloat(dataStavke.pretraga[i].potrazuje)
             console.log(dataStavke.pretraga[i].duguje,dataStavke.pretraga[i].potrazuje )
         }

         console.log("Sume su ",dSum,pSum)
       
        console.log("Data stavke su ",dataStavke)
        setDugujeSum(dSum)
        setPotrazujeSum(pSum) 
        // setDugujeSum(15)
        // setPotrazujeSum(25)

        // let res=[...dataStavke.pretraga]
        // res.sort((a, b) => (a.kartica.naziv.toUpperCase() > b.kartica.naziv.toUpperCase()) ? 1 : -1)
        // console.log("res is", res)
        // setResult(dataKartice.getKarticeBySum)
        // setStavke(res)
        setStavke(dataStavke.pretraga)
        // setStavke(dataStavke.pretraga)
      }
    }
  }
   )
  if (loading) return <p>Loading...</p>
  if(loadingOznake) {
    return <p>Loading...</p>
  }

//   const [ stavke,{loading:loadingStavke, error:errorStavke, data:dataStavke}]  = useLazyQuery(STAVKE,{onCompleted:(dataStavke)=>{
//     console.log("Pretraga started")
//     if(dataStavke){
//       console.log(dataStavke)
//     }
//   }
// } )

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

 


    const handlePretraga=()=>{
        console.log("Pretraga started")
        console.log("Godina je ", godina)
        console.log("Kartica je ", kartica)
        console.log("Oznaka je ", oznaka)
         pretraga({ variables:{godina,broj_izvoda,datum,kartica:kartica===null ? "":kartica._id,korisnik,deponent,oznaka:oznaka===null ? "64dcad2c93eddbd5eb3a32ed":oznaka._id ,broj_predmeta,godina_predmeta,duguje,potrazuje}})
          // .then(result=>console.log(" Result down there is", result))
         //  pretraga({ variables:{godina,broj_izvoda,datum,kartica:kartica===null ? "":kartica}})

         //  stavke()
        // console.log("Pretraga started here ")
        //  reset()
    }

    const reset=()=>{
     setGodina("")
     setBrojIzvoda("")
     setDatum("")
     setKartica(null)
     setKorisnik("")
     setDeponent("")
     setOznaka(null)
     setBrojPredmeta("")
     setGodinaPredmeta("")
     setDuguje("")
     setPotrazuje("")
    setStavke([])
    setLength(0)
    setDugujeSum(0)
    setPotrazujeSum(0)
    }




  return (
    <div>
         <Box sx={{
          display:"flex",
          justifyContent:"flex-end",
         
          mr:2
        }}>
      
      
      

        </Box>
         <Box sx={{
            maxWidth:"xl",
            mx:"auto"
          }}>
        <Box sx={{ display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{ fontWeight:100, fontSize:"1.25rem",color:"#8d6e63"}}  > Pretraga naloga    </Typography> 
        <Stanje />
        </Box>
         <Divider sx={{ mb:5}} />
         {/* { newError && errorStavka && <pre>  { errorStavka.graphQLErrors.map(({ message},i)=> <Alert key={i} severity="error">  { message} </Alert> )} </pre> }
         <ToastContainer /> */}
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
            // mb:2,
            // borderLeft:"15px solid #eee",
            // borderRight:"15px solid #eee",
            py:3,
            // justifyContent:"space-around",
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}>
             
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer  components={['DatePicker']}>
                <DatePicker slotProps={{ textField: { size: 'small' } }}  onChange={ handleChangeGodina} label={'Godina'} views={['year']} value={ dayjs(godina)} />
                
              </DemoContainer>
            </LocalizationProvider>
           
           <TextField  label="Broj izvoda"
            id=""
            size="small"
            value={ broj_izvoda}
            onChange={ (e)=> setBrojIzvoda(e.target.value)  } 
            sx={{ fontSize:"2.5rem"}}
        />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small' } }}  onChange={handleChangeDatum} format='DD.MM.YYYY' label="Datum" value={ dayjs(datum)} />
            </DemoContainer>
          </LocalizationProvider>
          </Box>

          <Box  
           sx={{ 
            display:"flex",
            // justifyContent:"space-around",
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
                      value={oznaka}
                      sx={{ width: 300 }}
                      id="combo-box-demo"
                      options= { dataOznake.oznake===null ? [] : dataOznake.oznake }
                      getOptionLabel={(option) => option.naziv}
                      
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
                      onChange={(e,newValue)=>setKartica(newValue)}
                    />
                    
           </Box>   

         
         
            {/* <Box  sx={{ 
            display:"flex",
            justifyContent:"space-around",
            // mb:2,
            // border:"1px solid #eee",
            py:3,
            alignItems:"flex-end",
            '&> :not(style)':{
              mr:2
            }
            }}> */}
                  {/* <Autocomplete
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                       value={kartica}
                      options= { data.kartice===null ? [] : data.kartice }
                      getOptionLabel={(option) => option.naziv}
                      // options={ top100Films }
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField    {...params} label="Kartica" naziv="kartica"   />}
                      onChange={(e,newValue)=>setKartica(newValue)}
                    /> */}

                   {/* <Autocomplete
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                       value={kartica}
                      options= { data.kartice===null ? [] : data.kartice }
                      getOptionLabel={(option) => option.naziv}
                      // options={ top100Films }
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField    {...params} label="Kartica" naziv="kartica"   />}
                      onChange={(e,newValue)=>setKartica(newValue)}
                    /> */}

                     {/* <TextField 
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
               */}
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
              // justifyContent:"space-around",
              // border:"1px solid #eee",
              py:3,
              '&> :not(style)':{
                width:"150px",
                mr:3
                
              }
            }}>
              <Button variant="outlined" color="inherit" onClick={ handlePretraga } >Pretraži</Button>
              <Button variant="outlined" color="inherit" onClick={ reset } >Obriši</Button>
            </Box>
          
            </Box>
            
            <Box>
           
             <AppPagination dugujeSum={ dugujeSum} potrazujeSum={ potrazujeSum} length={length} stavke={stavke} />
            </Box>
                 
                    
    </div>
  )
}

export default Pretraga