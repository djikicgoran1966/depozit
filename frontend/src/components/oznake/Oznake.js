import React from 'react'
import PrintComponents from 'react-print-components'
import { Alert ,CircularProgress,Box, Button, List, ListItem, Typography, Divider } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery } from '@apollo/client'
import {OZNAKE}  from "../../queries/oznake"
import OznakaDetails from './OznakaDetails';
import CreateOznakaModal from './CreateOznakaModal'
import Kartice from '../kartice/Kartice';
import OznakePrint from './OznakePrint';
const Oznake = () => {
    const { loading, error, data } = useQuery(OZNAKE);

    if  (loading) {
        return <CircularProgress />
    }
    console.log(data)
  return (
    <div>
       <Box sx={{ 
            maxWidth:"xl",
            mx:"auto"
        }}>
       <Typography sx={{ fontWeight:300, fontSize:"1.25rem",color:"#8d6e63"}}  > Oznake predmeta </Typography> 
       <Divider sx={{ mb:5}} />

       
         
            <Box sx={{
                display:"flex",
                justifyContent:"end"
            }}>
              {/* <PrintComponents  trigger={ <Button color="success" variant='outlined' >Štampa</Button>  } > */}
                {/* <OznakePrint oznake={data.oznake} />
              </PrintComponents> */}
          <CreateOznakaModal  /> 
          
          
            </Box>
           
            <List>
                <ListItem sx={{ backgroundColor:"#f5f5f5", fontWeight:100, color:"#8d6e63"}}>  Naziv oznake </ListItem>
               { data.oznake.map(oznaka=>{
                return <OznakaDetails key={ oznaka._id } oznaka={oznaka} /> 
            
        }) }
          </List>
        </Box>
    </div>
  )
}

export default Oznake