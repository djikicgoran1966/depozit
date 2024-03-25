import { ListItem } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KarticaMenu from './KarticaMenu';
const KarticaDetails = ({kartica}) => {
  return (
    <ListItem disablePadding key={ kartica._id} sx={{ 
        pl:2,
        cursor:"pointer", 
        maxWidth:"xl",
        display:"flex",
        justifyContent:"space-between",
        backgroundColor:"#fff",
        borderBottom:"1px solid #eee",
        color:"#8d6e63",
        fontWeight:100,
        '&:hover':{
            background:"#f5f5f5", 
        }
        }}>
        { kartica.naziv}
        <KarticaMenu kartica={ kartica} />
    </ListItem>
  )
}

export default KarticaDetails