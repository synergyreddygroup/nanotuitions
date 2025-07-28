import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import { 
  AccountTree as BranchIcon,
  People as EmployeeIcon,
  School as StudentIcon,
  AttachMoney as FeeIcon,
  Paid as SalaryIcon,
  Today as AttendanceIcon,
  Assessment as ReportIcon
} from '@mui/icons-material';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              color: 'white',
              borderRadius: '50%',
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

function Dashboard() {
  // In a real app, these would come from API calls
  const stats = {
    branches: 5,
    employees: 23,
    students: 156,
    fees: 125000,
    salaries: 320000,
    attendance: '87%'
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard 
            title="Total Branches" 
            value={stats.branches} 
            icon={<BranchIcon fontSize="large" />} 
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard 
            title="Total Employees" 
            value={stats.employees} 
            icon={<EmployeeIcon fontSize="large" />} 
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard 
            title="Total Students" 
            value={stats.students} 
            icon={<StudentIcon fontSize="large" />} 
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard 
            title="Fee Collection" 
            value={`₹${stats.fees.toLocaleString()}`} 
            icon={<FeeIcon fontSize="large" />} 
            color="#4caf50"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Box>
                {/* Recent activities list would go here */}
                <Typography>New student admission: Alice Johnson</Typography>
                <Typography>Fee payment received: ₹5,000</Typography>
                <Typography>Attendance marked for Morning Batch</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary">
                    Admit Student
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="success">
                    Collect Fee
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="secondary">
                    Add Employee
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="info">
                    Add Branch
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;