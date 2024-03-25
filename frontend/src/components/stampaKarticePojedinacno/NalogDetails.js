import React,{useContext} from 'react'
import AuthContext from '../../context/AuthContext'
// import  NalogMenu from './NalogMenu'
import { Typography, Grid, Checkbox,ListItem, IconButton, Pagination } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
// import MenuItem from './MenuItem1';
// import MenuItem1 from './MenuItem1';
// import BasicMenu from './BasicMenu';


const NalogDetails = ({nalog}) => {
    const context=useContext(AuthContext)
    
    return (
                            <ListItem disableGutters disablePadding  >
                            <Grid  container 
                                sx={{ 
                                    pl:2,
                                    
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
                                    <Typography > { nalog.godina} </Typography>
                                    <Typography >{ nalog.broj_izvoda}</Typography>
                                </Grid>
                               
                                <Grid item xs={1} >
                                    <Typography >{ (new Date(nalog.datum)).toLocaleDateString() }</Typography>
                                </Grid>
                                <Grid item xs={1} >
                                    <Typography >
                                      
                                    {nalog.oznaka.naziv==="NN"  ? "" : nalog.oznaka.naziv }
                                    {nalog.broj_predmeta===null ? "": "-" } 
                                    { nalog.broj_predmeta}
                                    {nalog.godina_predmeta===null ? "": "-" } 
                                    {nalog.godina_predmeta}
                                    </Typography>
                                </Grid>
                                {/* <Grid item xs={2} >
                                    <Typography > {nalog.kartica.naziv} </Typography>
                                </Grid> */}
                                <Grid item xs={4} >
                                    <Typography > {nalog.korisnik} </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography > {nalog.deponent} </Typography>
                                </Grid>
                                <Grid item xs={1} >
                                    <Typography > { parseFloat(nalog.duguje).toFixed(2)} </Typography>
                                </Grid>
                                <Grid item xs={1} >
                                    <Typography > { parseFloat(nalog.potrazuje).toFixed(2)} </Typography>
                                </Grid>
                                {/* { context.token===null ? null :
                                <Grid item xs={1} >
                                   <NalogMenu nalog={nalog} />
                                </Grid>
                               } */}
                            </Grid>
                     </ListItem>
            
  )
}

export default NalogDetails