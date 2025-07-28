import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Dummy Data
const employees = [
  { id: 'EMP001', name: 'John Doe', email: 'john.doe@nanotuitions.com', role: 'admin', branch: 'Main Branch', status: 'active' },
  { id: 'EMP002', name: 'Jane Smith', email: 'jane.smith@nanotuitions.com', role: 'branch', branch: 'Secondary Branch', status: 'active' },
  { id: 'EMP003', name: 'Peter Jones', email: 'peter.jones@nanotuitions.com', role: 'employee', branch: 'Main Branch', status: 'active' },
];

function Employees() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    branch: '',
    password: '' // For new employee creation, handle securely
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Employee Data:', formData);
    alert('Employee added! (Check console)');
    // In a real app, send formData to Firebase Authentication and Firestore
    setOpen(false);
    setFormData({ name: '', email: '', role: '', branch: '', password: '' }); // Reset form
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'central': return 'primary';
      case 'branch': return 'info';
      case 'employee': return 'default';
      default: return 'default';
    }
  };

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
              <TableCell>Email</TableCell>
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
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                    color={getRoleChipColor(employee.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{employee.branch}</TableCell>
                <TableCell>
                    <Chip
                        label={employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        color={employee.status === 'active' ? 'success' : 'warning'}
                        size="small"
                    />
                </TableCell>
                <TableCell>
                  <Button size="small" color="secondary">Edit</Button>
                  <Button size="small" color="error" sx={{ ml: 1 }}>Deactivate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Employee Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email (Employee ID)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
             <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              helperText="Initial password for the employee. They should change it upon first login."
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              name="role"
              select
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="central">Central Office</MenuItem>
              <MenuItem value="branch">Branch Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Assigned Branch"
              name="branch"
              select
              value={formData.branch}
              onChange={handleChange}
              required
            >
              {/* Populate with actual branch data from Firebase */}
              <MenuItem value="Main Branch - Hyderabad">Main Branch - Hyderabad</MenuItem>
              <MenuItem value="Secondary Branch - Secunderabad">Secondary Branch - Secunderabad</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Employees;