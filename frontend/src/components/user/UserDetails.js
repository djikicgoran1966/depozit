import React from 'react'
import UserMenu from './UserMenu'
import { Grid, ListItem,Box } from '@mui/material'
const UserDetails = ({id,user}) => {
  return (
    <div>
        <ListItem sx={{   fontWeight:100, color:"#8d6e63", maxWidth:"xl", '&:hover':{ backgroundColor:"#f5f5f5" } }}>
       <Grid container>
        <Grid item xs={2}> { user.firstName} </Grid>
        <Grid item xs={2}> { user.lastName} </Grid>
        <Grid item xs={2}> { user.email} </Grid>
        <Grid item xs={2}> { user.role} </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1} > <Box  xs={{ display:"flex", justifyContent:"end", mr:1 }}> <UserMenu user={user} /> </Box>   </Grid>
        </Grid>
        
       </ListItem>
    </div>
  )
}

export default UserDetails