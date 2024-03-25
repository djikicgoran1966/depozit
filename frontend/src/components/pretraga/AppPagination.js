import React, {useState,useEffect} from 'react'
import Nalozi from './Nalozi'
import { Box,Pagination } from '@mui/material'
const pageSize=15

const AppPagination = ({ stavke,dugujeSum, potrazujeSum,length}) => {
  //  console.log("App pagination ",dugujeSum) 
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


    const [nalozi, setNalozi]=useState(null)

    useEffect ( ()=>{     
         // console.log("kartice, ",stavke)
         //    setCount(stavke.slice(from,to).length)
           setCount(stavke.length)
           setNalozi(stavke.slice(from,to))
   }, [ from, to,stavke] )


  return (
    <div>
         <Nalozi nalog={stavke} dugujeSum={dugujeSum} potrazujeSum={ potrazujeSum} length={ length} nalozi={nalozi} />
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