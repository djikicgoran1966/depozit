import { Box, Button, CssBaseline, Divider, Input, TextField, Typography, IconButton, List, ListItem, Grid, Checkbox,Pagination } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import React, { useState} from 'react'
import PrintComponents from 'react-print-components'
import NalogPrint from './NalogPrint'
import NalogDetails from './NalogDetails';


const Nalozi = ( {nalog,nalozi,dugujeSum, potrazujeSum,length} ) => {
        console.log("Nalozi u nalozima su ,",)
  return (
    <div> 
        <CssBaseline />
        {/* <Box  sx={{ backgroundColor:"#ffffff",py:4}}> */}
          { length===0 ? null :
            <Box sx={{  maxWidth:"xl",mx:"auto", backgroundColor:"#fff" }}>  
                 { length===0 ? null : 
                 <Box sx={{ 
                  
                  display:"flex",
                  justifyContent:"end",
                  alignItems:"center",
                 
                  '&> :not(style)':{
                    mr:2,
                    mt:2,
                    // backgroundColor:"warning.main",
                    // color:"white",
                    borderRadius:1,
                    p:1
                  }
                  }}>
                     <PrintComponents  trigger={ <Button color="inherit" variant='outlined' >Štampa</Button>  } >
                      <NalogPrint nalog={nalog} dugujeSum={dugujeSum} potrazujeSum={potrazujeSum} length={length} />
                    </PrintComponents>
                    <Box sx={{border:"1px solid"}}>
                 Stavki:   { length}
                    </Box>
                    <Box  sx={{border:"1px solid"}}>
                    {/* parseFloat(kartica.sumPotrazuje).toFixed(2) */}
                   Duguje: { parseFloat( dugujeSum).toFixed(2)  }
                  
                    </Box>
                    <Box  sx={{border:"1px solid"}}>
                    Potražuje:{ parseFloat( potrazujeSum).toFixed(2)  }    
                    </Box>
                    <Box  sx={{border:"1px solid", color:"green"}}>
                    Saldo:{ parseFloat( potrazujeSum-dugujeSum).toFixed(2)  }    
                    </Box>         
                  </Box>
                  }
                <List>
                    <ListItem disableGutters disablePadding>
                        <Grid  container 
                            sx={{ 
                              color:"#8d6e63",
                            
                                backgroundColor:"#f5f5f5",
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
                                 <Typography sx={{ pl:2, fontWeight:100}} >Godina</Typography>
                                 <Typography sx={{ fontWeight:100,}} >Broj izvoda</Typography>
                            </Grid>
                            
                            <Grid item xs={1} >
                                 <Typography  sx={{ fontWeight:100,}} >Datum</Typography>
                            </Grid>
                            <Grid item xs={1} >
                            <Typography  sx={{ fontWeight:100,}} >Broj predmeta</Typography>
                            </Grid>
                            <Grid item xs={2} >
                            <Typography  sx={{ fontWeight:100,}} >Naziv kartice</Typography>
                            </Grid>
                            <Grid item xs={2} >
                              <Typography  sx={{ fontWeight:100,}}>Korisnik</Typography>
                            </Grid>
                            <Grid item xs={2} >
                              <Typography  sx={{ fontWeight:100,}}>Deponent</Typography>
                            </Grid>
                            <Grid item xs={1} >
                              <Typography  sx={{ fontWeight:100,}}>Duguje</Typography>
                            </Grid>
                            <Grid item xs={1} >
                              <Typography  sx={{ fontWeight:100,}}>Potražuje</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                  


                    { nalozi!==null ?  
                    nalozi.map(nalog=>{
                     
                    
                        
                                              return <NalogDetails key={ nalog._id} nalog={ nalog} />
                                               }
                          ) 
                      : <Typography>No results yet</Typography> }
                
                  
                   
                </List>
              
              
            
            </Box>  
         }
     
    </div>
  )
}

export default Nalozi