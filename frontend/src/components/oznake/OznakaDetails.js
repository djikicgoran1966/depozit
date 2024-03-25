import { ListItem } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OznakaMenu from './OznakaMenu';
const OznakaDetails = ({oznaka}) => {
  return (
    <ListItem disablePadding key={ oznaka._id} sx={{ 
        cursor:"pointer", 
        display:"flex",
        justifyContent:"space-between",
        backgroundColor:"#fff",
        borderBottom:"1px solid #eee",
        pl:2,
        color:"#8d6e63",
        fontWeight:100,
        '&:hover':{
            background:"#f5f5f5"
           
        }
        }}>
        { oznaka.naziv}
        <OznakaMenu oznaka={ oznaka} />
    </ListItem>
  )
}

export default OznakaDetails