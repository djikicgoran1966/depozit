import React from 'react'
import NalogDetails from './NalogDetails'

const Nalog = ({nalog}) => {
  return (
    <div>
        
        
        {       
                    nalog.map(result=>{ 
                      console.log("Map function")   
                    return <NalogDetails key={ result._id} nalog={result}  /> 
                    }) 
                    } 

    </div>
  )
}

export default Nalog