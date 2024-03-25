import React, { useState} from 'react'
import { Alert ,CircularProgress,Box, Button, List, ListItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery } from '@apollo/client'
import {ITEMS}  from "../../queries/items"
import ItemDetails from './ItemDetails';
import CreateItemModal from './CreateItemModal'
const Items = () => {
  // const [ iznos,setIznos]=useState("")  
  const { loading, error, data } = useQuery(ITEMS);
   let iznos=0
    if  (loading) {
        return <CircularProgress />
    }
    console.log(data)
  return (
    <div>
           <Typography variant="h2" sx={{
            color:"info.dark",
            fontWeight:100,
            textAlign:"center"
           }} >Items</Typography>
        <Box sx={{ 
            width:"95%",
            mx:"auto",
            backgroundColor:"#eee",
            padding:2,
            borderRadius:"15px"
        }}>
         
            <Box sx={{
                display:"flex",
                justifyContent:"flex-end"
            }}>
          <CreateItemModal  /> 
          
            </Box>
           
            <List>
              <Box sx={{ display:"flex"}}>
              <ListItem component="span"> Naziv </ListItem>
              <ListItem component="span">Datum</ListItem>
              <ListItem>Price</ListItem>
              </Box>
              
               { data.items.map(item=>{
                 iznos=iznos+ parseFloat(item.price) 
                 return <ItemDetails key={ item._id } item={item} /> 
            
        }) }
          </List>
          { iznos}
        </Box>
    </div>
  )
}

export default Items