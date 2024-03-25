import React, {useState,useEffect} from 'react'
import NegativneKartice from './NegativneKartice'
import { Box,Pagination } from '@mui/material'
const pageSize=15

const AppPagination = ({ kartice}) => {
//    console.log("Kartice from app pagination are ,", kartice)
  const [ count,setCount]=useState(0)
    const [from,setFrom]=useState(0)
    const [ to,setTo]=useState(pageSize)
    const [result, setResult]=useState(kartice)
    

    const handlePageChange=( event,page)=>{
        const from=(page-1)*pageSize
        const to=(page-1)*pageSize +pageSize
       
        setFrom (from)
        setTo(to)
       
    }


    useEffect ( ()=>{ 
          //  console.log("kartice, ",result)
           setCount(kartice.length)  
           setResult(kartice.slice(from,to))
   }, [ from, to,kartice] )


  return (
    <div>
         <NegativneKartice kartice={result} />
    <Box
    display={"flex"} justifyContent={"center"} alignItems={"center"}  
    sx={{ 
        m:"20px 0px",
        fontSize:"2rem"
    
    }}
    >
       { kartice.length===0 ? null : 
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