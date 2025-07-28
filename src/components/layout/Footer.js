import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        p: 2,
        mt: 'auto', // Pushes footer to the bottom
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
        position: 'fixed', // Fixed position at bottom
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 0, // Ensure it's below sidebar/navbar zIndex if needed
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        Nano Tuitions {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default Footer;