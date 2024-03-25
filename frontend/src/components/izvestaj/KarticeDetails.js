import * as React from 'react';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress, Grid,ListItem,List, Box } from '@mui/material';
import { FINDSTAVKEBYKARTICA } from '../../queries/stavke';
import { useQuery } from '@apollo/client';
import NalogDetails from './NalogDetails';

export default function KarticeDetails({kartica}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { data,isLoading,error}=useQuery(FINDSTAVKEBYKARTICA ,{ variables:{kartica:kartica._id}})
  if (isLoading) return  < CircularProgress /> 
  // useEffect(() => {
  //  findStavkeByKartica({ variables:{kartica}  } )
  // },[]);
    // console.log("data is ",data)
  return (
    <div>
      <Accordion sx={{ border:"1px solid gray"}} expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary
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
          <Grid container >
          <Grid item xs={3}  sx={{   color: expanded ? "info.main":null,fontSize:expanded ? "1.4rem":"1rem"}} > {kartica.kartica.naziv}  </Grid>
      

        <Grid item xs={2}>   { parseFloat(kartica.sumDuguje).toFixed(2)  } </Grid> 
        <Grid item xs={2}>   { parseFloat(kartica.sumPotrazuje).toFixed(2)  } </Grid> 
        <Grid item xs={2} >  { parseFloat(kartica.saldo).toFixed(2)  } </Grid> 
        
          
        </Grid>
        
        
      </ListItem>
        </AccordionSummary>
        <AccordionDetails>
        <List>
                    <ListItem>
                        <Grid  container 
                            sx={{ 
                               
                                backgroundColor:"info.main",
                                color:"white",
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
                            
                            <Grid item xs={1} sx={{ display:"flex", justifyContent:"space-around"}} >
                                 <Typography sx={{ pl:2}} >Godina</Typography>
                                 <Typography >Broj izvoda</Typography>
                            </Grid>
                            
                            <Grid item xs={1} >
                                 <Typography >Datum</Typography>
                            </Grid>
                            <Grid item xs={1} >
                            <Typography >Broj predmeta</Typography>
                            </Grid>
                            <Grid item xs={2} >
                            <Typography >Naziv kartice</Typography>
                            </Grid>
                            <Grid item xs={2} >
                              <Typography>Korisnik</Typography>
                            </Grid>
                            <Grid item xs={2} >
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
                    data.findStavkeByKartica.map(nalog=>{
                      // dugujeSum=dugujeSum+parseFloat(nalog.duguje)
                      // potrazujeSum=potrazujeSum+parseFloat(nalog.potrazuje)
                      // console.log("Duguje sum ", dugujeSum)
                      // setDugujeSum(dugujeSum+parseFloat(nalog.duguje))
                      // setPotrazujeSum(potrazujeSum+parseFloat(nalog.potrazuje))
                    
                        
                                              return <NalogDetails key={ nalog._id} nalog={ nalog} />
                                               }
                          ) 
                      : <Typography>No results yet</Typography> }
                
                  
                   
                </List>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}