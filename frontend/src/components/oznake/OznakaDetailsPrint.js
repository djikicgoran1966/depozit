import { ListItem } from '@mui/material'
import React from 'react'

const OznakaDetailsPrint = ({oznaka}) => {
  return (
    <ListItem key={ oznaka._id} sx={{ 
        cursor:"pointer", 
      
        display:"flex",
        justifyContent:"space-between",
        backgroundColor:"#fff",
        borderBottom:"1px solid #eee",
        }}>
        { oznaka.naziv}

    </ListItem>
  )
}

export default OznakaDetailsPrint