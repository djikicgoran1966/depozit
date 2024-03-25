import React from 'react'
import { List, ListItem } from '@mui/material'
import OznakaDetailsPrint from './OznakaDetailsPrint'

const OznakePrint = ({oznake}) => {
  return (
    <div>
        
        <List>
                <ListItem> Naziv oznake </ListItem>
               { oznake.map(oznaka=>{
                return <OznakaDetailsPrint key={ oznaka._id } oznaka={oznaka} /> 
            
        }) }
          </List>
    </div>
  )
}

export default OznakePrint