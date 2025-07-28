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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const students = [
  { id: 'NT001001', name: 'Alice Johnson', course: 'Class 10 Math', paid: 5000, due: 10000, status: 'active' },
  { id: 'NT001002', name: 'Bob Smith', course: 'Class 12 Physics', paid: 8000, due: 7000, status: 'active' },
  { id: 'NT001003', name: 'Charlie Brown', course: 'Class 9 Science', paid: 10000, due: 0, status: 'active' },
];

function Students() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    parentPhone: '',
    course: '',
    batch: '',
    address: '',
    initialPayment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    setOpen(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Student Management</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Admit New Student
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Fee Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>
                  <Chip 
                    label={student.due > 0 ? `Due: ₹${student.due}` : 'Paid'} 
                    color={student.due > 0 ? 'error' : 'success'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" color="primary">View</Button>
                  <Button size="small" color="secondary">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Admit New Student</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Student Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Parent/Guardian Name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Parent Phone Number"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Course"
              name="course"
              select
              value={formData.course}
              onChange={handleChange}
              required
            >
              <MenuItem value="Class 10 Math">Class 10 Math</MenuItem>
              <MenuItem value="Class 12 Physics">Class 12 Physics</MenuItem>
              <MenuItem value="Class 9 Science">Class 9 Science</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Batch"
              name="batch"
              select
              value={formData.batch}
              onChange={handleChange}
              required
            >
              <MenuItem value="Morning Batch A">Morning Batch A</MenuItem>
              <MenuItem value="Morning Batch B">Morning Batch B</MenuItem>
              <MenuItem value="Evening Batch A">Evening Batch A</MenuItem>
            </TextField>
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
              label="Initial Payment (₹)"
              name="initialPayment"
              type="number"
              value={formData.initialPayment}
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Admit Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students;