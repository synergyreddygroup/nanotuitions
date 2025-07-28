import React, { useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Button, MenuItem, Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

// Dummy data
const students = [
  { id: 'NT001001', name: 'Alice Johnson', course: 'Class 10 Math', batch: 'Morning Batch A' },
  { id: 'NT001002', name: 'Bob Smith', course: 'Class 12 Physics', batch: 'Morning Batch A' },
  { id: 'NT001003', name: 'Charlie Brown', course: 'Class 9 Science', batch: 'Evening Batch A' },
  { id: 'NT001004', name: 'Diana Prince', course: 'Class 10 Math', batch: 'Morning Batch B' },
];

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBatch, setSelectedBatch] = useState('Morning Batch A');
  const [attendanceRecords, setAttendanceRecords] = useState(
    students.filter(s => s.batch === 'Morning Batch A').map(s => ({
      studentId: s.id,
      name: s.name,
      status: 'present', // Default to present
    }))
  );

  const batches = [...new Set(students.map(s => s.batch))];

  const handleBatchChange = (event) => {
    const newBatch = event.target.value;
    setSelectedBatch(newBatch);
    setAttendanceRecords(
      students.filter(s => s.batch === newBatch).map(s => ({
        studentId: s.id,
        name: s.name,
        status: 'present',
      }))
    );
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords(prevRecords =>
      prevRecords.map(record =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  const saveAttendance = () => {
    const attendanceData = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      batch: selectedBatch,
      records: attendanceRecords,
    };
    console.log("Saving attendance:", attendanceData);
    alert("Attendance saved! Check console for data.");
    // In a real app, you would send this data to Firebase
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Attendance Management</Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            select
            label="Select Batch"
            value={selectedBatch}
            onChange={handleBatchChange}
            sx={{ minWidth: 200 }}
          >
            {batches.map((batch) => (
              <MenuItem key={batch} value={batch}>
                {batch}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={() => alert('Load historical attendance (Not implemented)')}>
            Load Attendance
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record) => (
                <TableRow key={record.studentId}>
                  <TableCell>{record.studentId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      color={record.status === 'present' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="success"
                      onClick={() => handleAttendanceChange(record.studentId, 'present')}
                      disabled={record.status === 'present'}
                    >
                      Present
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleAttendanceChange(record.studentId, 'absent')}
                      disabled={record.status === 'absent'}
                      sx={{ ml: 1 }}
                    >
                      Absent
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No students found for this batch.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={saveAttendance}
          disabled={attendanceRecords.length === 0}
        >
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
}

export default Attendance;