import React, {useState,useEffect} from 'react'
import KarticePage from './KarticePage'
import { Box,Pagination } from '@mui/material'
const pageSize=15

const AppPagination = ({ kartice,length}) => {
    console.log("APP PAGINATION ",kartice) 
   const [ count,setCount]=useState(0)
    const [from,setFrom]=useState(0)
    const [ to,setTo]=useState(pageSize)
    // console.log("Stavke su ", stavke)
    
    const handlePageChange=( event,page)=>{
        const from=(page-1)*pageSize
        const to=(page-1)*pageSize +pageSize
       
        setFrom (from)
        setTo(to)
    }


    const [kartice1, setKartice1]=useState(kartice)

    useEffect ( ()=>{     
           setCount(kartice.length)
           setKartice1(kartice.slice(from,to))
           console.log("KARTICE1 SU", kartice1)
   }, [ from, to,kartice] )

   
  return (
    <div>
       <KarticePage  kartice={kartice1} length={length} /> 
    <Box
    display={"flex"} justifyContent={"center"} alignItems={"center"}  
    sx={{ 
        m:"20px 0px",
        fontSize:"2rem"
    
    }}
    
    >
       { length===0 ? null:
       <Pagination size='large' 
       count=  {Math.ceil(count/pageSize) }
       onChange={handlePageChange}
       />
       }
       
        </Box>
    </div>
  )
}

export default AppPagination