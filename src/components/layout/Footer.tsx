import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Nano Tuitions. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Version 1.0.0
      </Typography>
    </Box>
  );
}

export default Footer;