import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditNalogModal from './EditNalogModal';
import DeleteNalogModal from './DeleteNalogModal';




export default function NalogMenu({nalog}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <MoreVertOutlinedIcon />
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
       
        
        <EditNalogModal closeMenu={ handleClose} nalog={nalog}  />
        <DeleteNalogModal closeMenu={ handleClose} nalog={nalog}  />        
      </Menu>
    </div>
  );
}