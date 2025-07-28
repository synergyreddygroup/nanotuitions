import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EmployeeAdd from '../components/central/EmployeeAdd';

const employees = [
  { id: 'NT201001', name: 'Sarah Tutor', role: 'Subject Tutor', branch: '001', status: 'active' },
  { id: 'NT402001', name: 'John Manager', role: 'Branch Manager', branch: '001', status: 'active' },
  { id: 'NT501001', name: 'Mike Head', role: 'Central Academic Head', branch: null, status: 'active' },
];

function Employees() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employee Management</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add New Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.branch || 'Central'}</TableCell>
                <TableCell>
                  <Chip 
                    label={employee.status} 
                    color={employee.status === 'active' ? 'success' : 'error'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" color="primary">Edit</Button>
                  <Button 
                    size="small" 
                    color={employee.status === 'active' ? 'error' : 'success'}
                  >
                    {employee.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EmployeeAdd open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default Employees;