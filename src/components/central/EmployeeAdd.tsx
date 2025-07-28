import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface RoleOption {
  value: string;
  label: string;
}

const roles: RoleOption[] = [
  { value: '201', label: 'Subject Tutor' },
  { value: '301', label: 'Front Desk Executive' },
  { value: '401', label: 'Academic Coordinator' },
  { value: '402', label: 'Branch Manager' },
  { value: '501', label: 'Central Academic Head' },
];

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
}

const EmployeeAdd: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    branch: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
    console.log('Employee Added:', formData);
    setOpen(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Add Employee</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add New Employee
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
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
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
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
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Branch (if applicable)"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" color="primary" variant="contained" onClick={(e) => handleSubmit(e as any)}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeAdd;
