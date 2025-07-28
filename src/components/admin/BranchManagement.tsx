import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

type Branch = {
  id: string;
  name: string;
  city: string;
  manager: string;
  status: 'active' | 'inactive';
};

const branches: Branch[] = [
  { id: '001', name: 'Downtown Branch', city: 'Hyderabad', manager: 'NT402001', status: 'active' },
  { id: '002', name: 'Uptown Branch', city: 'Hyderabad', manager: 'NT402002', status: 'active' },
];

type FormData = {
  name: string;
  city: string;
  address: string;
  manager: string;
  contact: string;
  email: string;
};

const BranchManagement: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    address: '',
    manager: '',
    contact: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Submit logic here
    setOpen(false);
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

      <Grid container spacing={3}>
        {branches.map(branch => (
          <Grid item xs={12} sm={6} md={4} key={branch.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="h6">{branch.name}</Typography>
                  <Typography
                    color={branch.status === 'active' ? 'success.main' : 'error.main'}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {branch.status}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">ID: {branch.id}</Typography>
                <Typography variant="body2">City: {branch.city}</Typography>
                <Typography variant="body2">Manager: {branch.manager}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button size="small" color="primary">Edit</Button>
                  <Button
                    size="small"
                    color={branch.status === 'active' ? 'error' : 'success'}
                  >
                    {branch.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Branch Manager ID"
              name="manager"
              value={formData.manager}
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
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
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
};

export default BranchManagement;
