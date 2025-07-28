import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material'; // Import Toolbar for spacing
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer'; // Import Footer

const drawerWidth = 240; // Define drawerWidth here or import from Sidebar if common

function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar /> {/* Navbar is fixed, so it needs to be outside main content flow usually */}
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`, // Adjust width for sidebar
          ml: `${drawerWidth}px`, // Push content to the right of sidebar
          mt: '64px', // Adjust for AppBar height (default is 64px on desktop)
          mb: '56px', // Adjust for Footer height (approx 56px for default padding)
        }}
      >
        {/* <Toolbar /> This might be redundant if mt is set on main Box */}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default AppLayout;