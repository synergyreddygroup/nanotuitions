import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Dummy Data
const branches = [
  { id: 'BR001', name: 'Main Branch - Hyderabad', location: 'Gachibowli, Hyderabad', contact: '040-12345678' },
  { id: 'BR002', name: 'Secondary Branch - Secunderabad', location: 'Paradise, Secunderabad', contact: '040-98765432' },
];

function Branches() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Branch Data:', formData);
    alert('Branch added! (Check console)');
    // In a real app, send formData to Firebase
    setOpen(false);
    setFormData({ name: '', location: '', contact: '' }); // Reset form
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Branch Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add New Branch
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Branch ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.id}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.location}</TableCell>
                <TableCell>{branch.contact}</TableCell>
                <TableCell>
                  <Button size="small" color="secondary">Edit</Button>
                  <Button size="small" color="error" sx={{ ml: 1 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Branch Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Branch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Branches;