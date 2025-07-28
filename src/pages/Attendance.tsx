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
  TextField,
  MenuItem
} from '@mui/material';
import { Today as TodayIcon } from '@mui/icons-material';

const students = [
  { id: 'NT001001', name: 'Alice Johnson', batch: 'Morning Batch A', status: 'present' },
  { id: 'NT001002', name: 'Bob Smith', batch: 'Morning Batch A', status: 'absent' },
  { id: 'NT001003', name: 'Charlie Brown', batch: 'Evening Batch B', status: 'present' },
];

const statusOptions = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'late', label: 'Late' },
];

function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [batch, setBatch] = useState('Morning Batch A');

  const handleStatusChange = (studentId, newStatus) => {
    // Update attendance status logic
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Attendance Management</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Batch"
            select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="Morning Batch A">Morning Batch A</MenuItem>
            <MenuItem value="Morning Batch B">Morning Batch B</MenuItem>
            <MenuItem value="Evening Batch A">Evening Batch A</MenuItem>
            <MenuItem value="Evening Batch B">Evening Batch B</MenuItem>
          </TextField>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<TodayIcon />}
          >
            Mark Attendance
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>
                  <TextField
                    select
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    variant="standard"
                    sx={{ minWidth: 120 }}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Attendance;