import React from 'react'
import KarticaDetails from './KarticaDetails'
const KarticePage = ({kartice,length}) => {
    console.log("KARTICE SU",kartice)
  return (
    <div>
        { length===0 ? null :
        <React.Fragment>
          { kartice.map(kartica=>{
            return <KarticaDetails key={ kartica._id } kartica={kartica} /> 
            
        }) }
        </React.Fragment>
    }
    </div>
  )
}

export default KarticePage