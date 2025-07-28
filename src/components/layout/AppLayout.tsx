import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material'; // Toolbar import not needed if spacing is handled with `mt`
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const drawerWidth = 240;

const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          mt: '64px', // AppBar height
          mb: '56px', // Footer space
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AppLayout;
