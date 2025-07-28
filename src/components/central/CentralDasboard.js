import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function CentralDashboard() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Central Office Overview</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1">
          This section is for Central Office-specific functionalities and data.
          (e.g., Employee management across branches, Salary processing, Consolidated reports)
        </Typography>
      </Paper>
    </Box>
  );
}

export default CentralDashboard;