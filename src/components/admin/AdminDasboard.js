import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Admin Overview</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1">
          This section is for Admin-specific functionalities and data.
          (e.g., User management, Global settings, System configurations)
        </Typography>
      </Paper>
    </Box>
  );
}

export default AdminDashboard;