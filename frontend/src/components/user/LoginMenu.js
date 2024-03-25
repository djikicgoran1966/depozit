import * as React from 'react';
import { useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import SyncIcon from '@mui/icons-material/SyncLockOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { Avatar } from '@mui/material';
import  AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const navigate=useNavigate()
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    setAnchorEl(null);
    context.logout()
    navigate("/login")
  }

  const handleChangePassword=(e)=>{
   
    setAnchorEl(null);
    navigate("/changePassword")
  }

  const handleProfile=()=>{
    setAnchorEl(null);
    navigate("/profile")
  }

  const context=useContext(AuthContext)

  return (
    <div>

      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar> {context.firstName.charAt(0)} </Avatar>
      {/* <MoreVertOutlinedIcon /> */}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
        
      >
        {/* <MenuItem onClick={handleClose} sx={{ fontSize:"1.5rem", width:"200px" }} >  <EditOutlinedIcon sx={{ mr:2}} /> <span> Edit </span>  </MenuItem> */}
       
        
        <MenuItem onClick={handleProfile}> <PersonIcon sx={{mr:1}} /> Profil</MenuItem>
        <MenuItem onClick={handleChangePassword}> <SyncIcon sx={{ mr:1}} /> Promena lozinke</MenuItem>
        <MenuItem onClick={handleLogout}> <LogoutIcon sx={{mr:1}} /> Odjava</MenuItem>      
      </Menu>
    </div>
  );
}

