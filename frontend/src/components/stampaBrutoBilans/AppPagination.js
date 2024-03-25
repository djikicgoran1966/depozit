import React, {useState,useEffect} from 'react'
import Nalozi from './Nalozi'
import { Box,Pagination } from '@mui/material'
const pageSize=15

const AppPagination = ({ kartice,dugujeSum, potrazujeSum,length,year}) => {
  //  console.log("App pagination ",dugujeSum) 
   const [ count,setCount]=useState(0)
    const [from,setFrom]=useState(0)
    const [ to,setTo]=useState(pageSize)
    const [nalozi, setNalozi]=useState(null)
    
    const handlePageChange=( event,page)=>{
        const from=(page-1)*pageSize
        const to=(page-1)*pageSize +pageSize
       
        setFrom (from)
        setTo(to)
    }


   

    useEffect ( ()=>{     
         // console.log("kartice, ",stavke)
         //    setCount(stavke.slice(from,to).length)
           setCount(kartice.length)
           setNalozi(kartice.slice(from,to))
   }, [ from, to,kartice] )


  return (
    <div>
         <Nalozi nalog={kartice} dugujeSum={dugujeSum} potrazujeSum={ potrazujeSum} length={ length} nalozi={nalozi} year={year} /> 
    <Box
    display={"flex"} justifyContent={"center"} alignItems={"center"}  
    sx={{ 
        m:"20px 0px",
        fontSize:"2rem"
    
    }}
    >
       { kartice.length===0 ? null:
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