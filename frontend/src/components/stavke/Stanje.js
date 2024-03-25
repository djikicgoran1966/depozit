import React,{useEffect} from 'react'
import { useQuery,useLazyQuery } from '@apollo/client'
import { GETSUM } from '../../queries/stavke'
import { Box, Typography } from '@mui/material'
const Stanje = () => {

   
    const { loading, error, data}=useQuery(GETSUM)
   
    if(loading) {
        return <p>Loading suma</p>
    }

   

  return (
    <Typography   > Saldo depozita: <Box component="span" sx={{ color:"red"}}>  {parseFloat(data.getSum).toFixed(2)} </Box> </Typography>
  )
}

export default Stanje