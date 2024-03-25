import React,{ useContext} from 'react'

import { Typography, Grid, Checkbox,ListItem, IconButton, Pagination } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AuthContext from '../../context/AuthContext';
// import MenuItem from './MenuItem1';
// import MenuItem1 from './MenuItem1';
// import BasicMenu from './BasicMenu';

const NalogDetails = ({nalog}) => {
    console.log("Nalog u nalog details is",nalog)
    const context=useContext(AuthContext)
  return (
       <div>
                            <ListItem disableGutters 
                            sx={{ "&:hover" :{
                                background:"#f5f5f5"
                            } }}
                            >
                            <Grid  container 
                                sx={{ 
                                    
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
                               
                               
                                {/* <Grid item xs={1} sx={{ display:"flex", justifyContent:"space-around"}} > 
                                    <Typography  sx={{ fontWeight:100,}} > { nalog.godina} </Typography>
                                    <Typography  sx={{ fontWeight:100,}} >{ nalog.broj_izvoda}</Typography>
                                </Grid>
                                */}
                                {/* <Grid item xs={1} >
                                    <Typography  sx={{ fontWeight:100,}} >{ (new Date(nalog.datum)).toLocaleDateString() }</Typography>
                                </Grid>
                                <Grid item xs={1} >
                                    <Typography  sx={{ fontWeight:100,}} >
                                    {nalog.kartica.naziv }
                
                                    </Typography>
                                </Grid> */}
                                <Grid item xs={4} >
                                    <Typography  sx={{ fontWeight:100,}} > {nalog.kartica.naziv} </Typography>
                                </Grid>
                                {/* <Grid item xs={2} >
                                    <Typography  sx={{ fontWeight:100,}} > {nalog.korisnik} </Typography>
                                </Grid>
                                <Grid item xs={2} >
                                    <Typography  sx={{ fontWeight:100,}} > {nalog.deponent} </Typography>
                                </Grid> */}
                                <Grid item xs={3} >
                                    <Typography  sx={{ fontWeight:100,}} > { parseFloat(nalog.sumDuguje).toFixed(2)} </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography  sx={{ fontWeight:100,}} > { parseFloat(nalog.sumPotrazuje).toFixed(2)} </Typography>
                                </Grid>
                                <Grid item xs={2} >
                                    <Typography  sx={{ fontWeight:100,}} > { parseFloat(nalog.saldo).toFixed(2)} </Typography>
                                </Grid>
                            </Grid>
                     </ListItem>
                     </div>
            
  )
}

export default NalogDetails