import * as React from 'react';
import { useContext,useEffect } from 'react';
import { checkToken } from '../middleware/check-token';
import AuthContext from '../context/AuthContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import NewIcon from '@mui/icons-material/AutorenewOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import FlagIcon from '@mui/icons-material/FlagOutlined';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import CardIcon from '@mui/icons-material/CardMembershipOutlined';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import PeopleIcon from '@mui/icons-material/PeopleAltOutlined';
import BalanceIcon from '@mui/icons-material/BalanceOutlined';
import TimeIcon from '@mui/icons-material/TimelineOutlined';
import MenuItem from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import LoginMenu from './user/LoginMenu';

const drawerWidth = 240;

export default function DrawerLeft() {
  
  const context=useContext(AuthContext)
  console.log( "Context is", context)

  useEffect(() => {
    checkToken(context);
  },[context] );


  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          // background:"#eee",
           backgroundColor:"#fff",
          color:"#8d6e63",
          boxShadow:"5px 5px #efebe9",
          borderRadius:"5px"

        }}>
          <Typography variant="h4" sx={{ fontWeight:100, display:"flex",alignItems:"center"}} noWrap component="div">
         <Box >  Privredni sud u Nišu -   </Box>   <Box  sx={{ fontStyle:"italic" }} >novčani depozit</Box>
          </Typography>
          <Box sx={{ display:"flex", justifyContent:"center"}}>
         { context.token ===null ? 
       
         
          <NavLink style={{ textDecoration:"none",color:"#8d6e63"}} to="/login" > <Box sx={{ display:"flex",justifyContent:"center"}}> <LoginIcon />  Prijava</Box> </NavLink >
         
         :
          <Box sx={{ display:"flex", alignItems:"center"}}>
          {/* <Avatar sx={{ width:35,height:35 }}> { context.firstName.charAt() }  </Avatar>
          <NavLink style={{ textDecoration:"none",color:"#8d6e63"}} to="/logout" > Odjava </NavLink > */}
         <LoginMenu />
          </Box>
          }
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* {['Novi nalog', 'Pretraga podataka', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <SearchIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
             <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <HomeIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/" > Početna </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
            { context.token===null ? "" : 
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <FlagIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/pocetnoStanje" > Početno stanje </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem> }
            { context.token===null ? "" : 
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <NewIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/novNalog" > Novi nalog</NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
            }
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <SearchIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/pretraga" > Pretraga </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <CheckBoxIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/proveraStanja" > Provera stanja </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
          
          </List>
          <Divider  />
          <List>
         

          {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <CardIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#000"}} to="/kartice" > Kartice </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem> */}

            { context.token===null ? "":               
              <React.Fragment>
               
                
              <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <BalanceIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/brutoBilans" > Bruto bilans </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <TimeIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/promet" > Promet na karticama </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
            <Divider />
             </React.Fragment>
             
            }

              { context.token===null ? "" : 
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <CardIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/kartice" > Kartice </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
              }
              { context.token===null ? "" : 
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <LabelIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/oznake" > Oznake predmeta </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
              }
             
              { context.role!=="admin" ? "": 
              <React.Fragment>
               <Divider />
              <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon> <PeopleIcon/> </ListItemIcon>
                 <ListItemText>
                  <NavLink style={{ textDecoration:"none",color:"#8d6e63", fontWeight:300}} to="/korisnici" > Korisnici sistema </NavLink >
                  </ListItemText> 
              </ListItemButton>
            </ListItem>
           </React.Fragment> 
              }

         
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}