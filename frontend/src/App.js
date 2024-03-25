import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate,redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import CreateStavka from './components/stavke/CreateStavka'
import DemoCarousel from './components/DemoCarousel' 
import Header from './components/Header'
import { Box, Grid } from '@mui/material'
import Items from './components/items/Items'
import Login from './components/user/Login'
import Oznake from './components/oznake/Oznake'
import DrawerLeft from './components/DrawerLeft'
import Home from './components/Home'
import Pretraga from './components/pretraga/Pretraga'
import Kartice from './components/kartice/Kartice'
import CreatePocetnoStanje from './components/stavke/CreatePocetnoStanje'
import ProveraStanja from './components/izvestaj/ProveraStanja'
import ProveraResult from './components/izvestaj/ProveraResult'
import Logout from './components/user/Logout'
import ChangePassword from './components/user/ChangePassword'
import Profile from './components/user/Profile'
import Users from './components/user/Users'
import NotFound from './components/NotFound'
import BrutoBilans from './components/stampaBrutoBilans/BrutoBilans'
import Promet from './components/stampaKarticePojedinacno/Promet'
import { checkToken } from './middleware/check-token'

const App = () => {
  const context=useContext(AuthContext)
  const[ id,setId]=useState(localStorage.getItem("id"))
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tokenExpiration, setTokenExpiration] = useState (localStorage.getItem("tokenExpiration"));


 
  // useEffect ( ()=>{
  //   checkToken(context)
  // })
  


  const logout = () => {
    console.log("Logged out");
    setId("")
    setFirstName("");
    setLastName("")
    setEmail("")
    setRole("");
    setToken(null);
    setTokenExpiration("");
    localStorage.removeItem("id");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    console.log("name", context.firstName);
    console.log("Token", context.token);
  };

  // const navigate = useNavigate()

  return (
    <AuthContext.Provider
    value={{
      id,
      setId,
      token,
      setToken,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      email,
      setEmail,
      role,
      setRole,
      tokenExpiration,
      setTokenExpiration,
      logout,
    }}

    >
    <Router sx={{ mt:10 }}>
    < Grid container >
     <Grid item xs={2} >
    
     <DrawerLeft />
     </Grid>
      <Grid item xs={10} sx={{ mt:10}} >
    
        <Routes>
          <Route path="/" element= {<Home />} />

         
          <Route path="/pretraga" element={ <Pretraga /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/logout" element={ <Logout /> } />
          
          (<Route path="/pocetnoStanje" element={ token!==null ? <CreatePocetnoStanje /> : <Login />  } />)
        
          <Route path="/novNalog" element={ token!==null ? <CreateStavka /> : <Login /> } />
          
          <Route path="/kartice" element ={ token!==null ? <Kartice /> : <Login /> } />
          
          <Route path="/oznake" element ={ token!==null ? <Oznake /> : <Login /> } />
          
          <Route path="/proveraStanja" element= { <ProveraStanja /> } />
          <Route path="/proveraResult/:kartica" element= { <ProveraResult /> } />
          {/* <Route path="/karticePretraga" element= { <FindKartice /> } /> */}
          <Route path="/changePassword" element= { token!==null ? <ChangePassword /> :<Login /> } />
          
          <Route path="/profile" element={ token!==null ?  <Profile /> :<Login /> } />
          
          <Route path="/korisnici" element={ token!==null && role==="admin" ? <Users /> : <Login /> }  />
          <Route path="/brutoBilans" element={ token!==null ? <BrutoBilans /> : <Login /> } />
          <Route path="/promet" element={ token!==null ? <Promet /> : <Login /> } />
            
          <Route path="*" element={ <NotFound /> } />
        </Routes>
   
      </Grid>
    
    
    </Grid>
    </Router>  
    </AuthContext.Provider>
  )
}

export default App


