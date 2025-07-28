import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button,
  TextField, MenuItem
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

function Reports() {
  const [reportType, setReportType] = useState('fees');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('all');

  const handleGenerateReport = () => {
    const reportParams = {
      type: reportType,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
      branch: selectedBranch,
    };
    console.log("Generating Report with params:", reportParams);
    alert(`Generating ${reportType} report for branch: ${selectedBranch} from ${reportParams.startDate || 'start'} to ${reportParams.endDate || 'end'}. (Check console)`);
    // In a real app, this would trigger a data fetch and display/download report
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reporting & Analytics</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Report Filters</Typography>
              <TextField
                select
                label="Report Type"
                fullWidth
                margin="normal"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="fees">Fee Collection Report</MenuItem>
                <MenuItem value="students">Student Enrollment Report</MenuItem>
                <MenuItem value="attendance">Attendance Summary</MenuItem>
                <MenuItem value="salaries">Salary Payout Report</MenuItem>
                <MenuItem value="employees">Employee List</MenuItem>
              </TextField>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </LocalizationProvider>

              <TextField
                select
                label="Select Branch"
                fullWidth
                margin="normal"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <MenuItem value="all">All Branches</MenuItem>
                {/* Populate with actual branch data from Firebase */}
                <MenuItem value="BR001">Main Branch - Hyderabad</MenuItem>
                <MenuItem value="BR002">Secondary Branch - Secunderabad</MenuItem>
              </TextField>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<DownloadIcon />}
                sx={{ mt: 3 }}
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Report Preview / Charts</Typography>
              <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography variant="body1" color="textSecondary">
                  Report preview or charts will appear here based on selection.
                  (Integrate charting libraries like Chart.js or Recharts)
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;