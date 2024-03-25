import React,{ useContext,useEffect} from 'react'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const context=useContext(AuthContext)
  context.logout()
  const navigate=useNavigate()
  navigate("/")
    return (
    <div>

    </div>
  )
}

export default Logout