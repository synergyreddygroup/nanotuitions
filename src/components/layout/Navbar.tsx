import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Avatar,
  Box,
  InputBase
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Navbar({ toggleDrawer }) {
  const { currentUser } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Nano Tuitions
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mr: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                pl: 1,
                pointerEvents: 'none'
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                pl: 4,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                },
              }}
            />
          </Box>
          
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
            <Typography variant="body1">
              {currentUser?.email || 'User'}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;