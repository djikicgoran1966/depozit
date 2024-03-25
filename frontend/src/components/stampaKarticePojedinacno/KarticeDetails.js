import * as React from 'react';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress, Grid,ListItem,List, Box,Button } from '@mui/material';
import {  } from '../../queries/stavke';
import { useQuery } from '@apollo/client';
import NalogDetails from './NalogDetails';
import { GETKARTICEBYIDANDBYYEAR,GETKARTICEBYDETAILS } from '../../queries/kartice';

export default function KarticeDetails({kartica,year,sumDuguje,sumPotrazuje,length,result}) {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  // console.log("YEAR IN DETAILS IS", year)
  // console.log("KARTICA IN DETAILS IS", kartica.kartica._id)
  // const { data,isLoading,error}=useQuery(GETKARTICEBYIDANDBYYEAR ,{ variables:{id:kartica.kartica._id, year:year}})
  const { data,isLoading,error}=useQuery(GETKARTICEBYDETAILS ,{ variables:{year:year,id:kartica.kartica._id}})

   if (isLoading) return  < CircularProgress /> 
  //  console.log("DATA IN DETAILS IS ",data)
  // console.log("DATA IS ",data)
  // useEffect(() => {
  //  findStavkeByKartica({ variables:{kartica}  } )
  // },[]);
    // console.log("data is ",data)
  return (
    <div>
      
      <Box sx={{ border:"1px solid gray"}}  >
        <Box
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ListItem disablePadding sx={{ 
        cursor:"pointer",
       py:1,
        pl:1,
        // "&:hover" :{
        //   backgroundColor:"primary.light",
        //   color:"white"
        // }
        }}  >
          {/* <Grid container >
          <Grid item xs={3}  > Naziv kartice: {kartica.kartica.naziv}  </Grid>    
        </Grid> */}
        <Grid container >
          <Grid item xs={6} > <Box sx={{ fontSize:'1rem'}} > Naziv kartice: {kartica.kartica.naziv}</Box>   </Grid>
      

        <Grid item xs={2} sx={{ fontSize:"0.8rem"}}> Duguje:   { parseFloat(kartica.sumDuguje).toFixed(2)  } </Grid> 
        <Grid item xs={2} sx={{ fontSize:"0.8rem"}}> Potražuje:  { parseFloat(kartica.sumPotrazuje).toFixed(2)  } </Grid> 
        <Grid item xs={2} sx={{ fontSize:"0.8rem"}}> Saldo: { parseFloat(kartica.saldo).toFixed(2)  } </Grid> 
        
          
        </Grid>

        
      </ListItem>
        </Box>
        <Box>
        <List>
                    <ListItem>
                        <Grid  container 
                            sx={{ 
                               
                                backgroundColor:"#efefef",
                               
                                '&> :not(style)':{
                                    display:"flex",
                                    alignItems:"center",
                                '&> :not(style)':{
                                  
                                   cursor:"pointer",
                                   width:"100%",
                                   mx:2
                                }
                                }
                            }}
                        >
                            
                            <Grid item xs={1} sx={{ display:"flex",
                             justifyContent:"space-around",
                            
                             }} >
                                 <Typography sx={{ pl:2}} >Godina</Typography>
                                 <Typography >Broj izvoda</Typography>
                            </Grid>
                            
                            <Grid item xs={1} >
                                 <Typography  >Datum</Typography>
                            </Grid>
                            <Grid item xs={1} >
                            <Typography  >Broj predmeta</Typography>
                            </Grid>
                            {/* <Grid item xs={2} >
                            <Typography >Naziv kartice</Typography>
                            </Grid> */}
                            <Grid item xs={4} >
                              <Typography>Korisnik</Typography>
                            </Grid>
                            <Grid item xs={3} >
                              <Typography>Deponent</Typography>
                            </Grid>
                            <Grid item xs={1} >
                              <Typography>Duguje</Typography>
                            </Grid>
                            <Grid item xs={1} >
                              <Typography>Potražuje</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                      
                    
                

                    { data ?  
                    data.getKarticeByDetails.map(nalog=>{
                        
                                              return <NalogDetails key={ nalog._id} nalog={ nalog} />
                                               }
                          ) 
                      : <CircularProgress /> }
                
                  
                   
                </List>
                {/* <Grid container >
            

              <Grid item xs={2}>   { parseFloat(kartica.sumDuguje).toFixed(2)  } </Grid> 
              <Grid item xs={2}>   { parseFloat(kartica.sumPotrazuje).toFixed(2)  } </Grid> 
              <Grid item xs={2} >  { parseFloat(kartica.saldo).toFixed(2)  } </Grid> 
        
          
        </Grid> */}
        </Box>
      </Box>
     
    </div>
  );
}