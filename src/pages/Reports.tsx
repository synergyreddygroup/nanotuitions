import React from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Reports() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const financialData = [
    { month: 'Jan', fees: 120000, salaries: 80000 },
    { month: 'Feb', fees: 150000, salaries: 85000 },
    { month: 'Mar', fees: 180000, salaries: 90000 },
    { month: 'Apr', fees: 110000, salaries: 82000 },
    { month: 'May', fees: 130000, salaries: 85000 },
    { month: 'Jun', fees: 160000, salaries: 88000 },
  ];

  const branchData = [
    { id: '001', name: 'Downtown', students: 45, revenue: 450000 },
    { id: '002', name: 'Uptown', students: 32, revenue: 320000 },
    { id: '003', name: 'Westside', students: 28, revenue: 280000 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Tabs value={value} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="Financial" />
        <Tab label="Branch Performance" />
        <Tab label="Student Statistics" />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Financial Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  series={[
                    { data: financialData.map(item => item.fees), label: 'Fee Collection' },
                    { data: financialData.map(item => item.salaries), label: 'Salary Payments' }
                  ]}
                  xAxis={[{ data: financialData.map(item => item.month), scaleType: 'band' }]}
                />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profit/Loss
              </Typography>
              <Box sx={{ height: 300 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 850000, label: 'Total Fees' },
                        { id: 1, value: 510000, label: 'Total Salaries' },
                        { id: 2, value: 340000, label: 'Profit' },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Branch ID</TableCell>
                <TableCell>Branch Name</TableCell>
                <TableCell align="right">Students</TableCell>
                <TableCell align="right">Revenue (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branchData.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell align="right">{branch.students}</TableCell>
                  <TableCell align="right">{branch.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Typography>Student statistics will be displayed here</Typography>
      </TabPanel>
    </Box>
  );
}

export default Reports;