import React from 'react'
import { useParams } from 'react-router-dom'

const ProveraResult = () => {
    let { kartica } = useParams();
    return (
    <div>
        ProveraResult
            {kartica.kartica.naziv}
    </div>
  )
}

export default ProveraResult