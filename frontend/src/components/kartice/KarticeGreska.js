import React from 'react'
import { Alert ,CircularProgress,Box, Button, List, ListItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery } from '@apollo/client'
import {KARTICE}  from "../../queries/kartice"
import KarticaDetails from './KarticaDetails';
import CreateKarticaModal from './CreateKarticaModal'
const KarticeGreska = () => {
    const { loading, error, data } = useQuery(KARTICE);

    if  (loading) {
        return <CircularProgress />
    }
    console.log(data)
  return (
    <div>
           <Typography variant="h4" sx={{
            color:"info.dark",
            fontWeight:100,
            textAlign:"center"
           }} >Kartice depozita</Typography>
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
          <CreateKarticaModal key="ddf" /> 
          
            </Box>
           
            <List>
                <ListItem> Naziv kartice </ListItem>
        { data.kartice.map(kartica=>{
            return <KarticaDetails key={ kartica._id } kartica={kartica} /> 
            
        }) }
          </List>
        </Box>
    </div>
  )
}

export default Kartice