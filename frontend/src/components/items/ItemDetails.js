import { ListItem, Box } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ItemMenu from './ItemMenu';
const ItemDetails = ({item}) => {
  return (
    <ListItem key={ item._id} sx={{ 
        cursor:"pointer", 
        fontSize:"1.25rem",
        display:"flex",
        justifyContent:"space-between",
        backgroundColor:"#fff",
        borderBottom:"1px solid #eee",
        '&:hover':{
            background:"#aaa",
            color:"#fff",
           
        }
        }}>
          
          <Box>
          { item.naziv} 
          </Box>
          
          <Box>
          {  new Date(item.datum).toLocaleDateString()} 
          </Box>
         
          <Box>
            { item.price}
          </Box>
       
        <ItemMenu item={ item} />
    </ListItem>
  )
}

export default ItemDetails