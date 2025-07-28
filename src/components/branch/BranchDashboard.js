import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function BranchDashboard() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Branch Overview</Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1">
          This section is for Branch-specific functionalities and data.
          (e.g., Local student management, Fee collection for this branch, Local attendance)
        </Typography>
      </Paper>
    </Box>
  );
}

export default BranchDashboard;