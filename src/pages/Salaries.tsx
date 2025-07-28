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
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Paid as PaidIcon } from '@mui/icons-material';

const employees = [
  { id: 'NT201001', name: 'Sarah Tutor', role: 'Subject Tutor', salary: 25000, lastPaid: '2023-06-30' },
  { id: 'NT402001', name: 'John Manager', role: 'Branch Manager', salary: 40000, lastPaid: '2023-06-30' },
];

function Salaries() {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    if (selectedEmployee && amount) {
      alert(`Salary of ₹${amount} paid to ${selectedEmployee.name} for ${month}`);
      setSelectedEmployee(null);
      setAmount('');
      setOpen(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Salary Management</Typography>
        <TextField
          label="Month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 200 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary (₹)</TableCell>
              <TableCell>Last Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary.toLocaleString()}</TableCell>
                <TableCell>{employee.lastPaid}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    startIcon={<PaidIcon />}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setAmount(employee.salary);
                      setOpen(true);
                    }}
                  >
                    Pay Salary
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pay Salary</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Employee: <strong>{selectedEmployee.name}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Employee ID: <strong>{selectedEmployee.id}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Role: <strong>{selectedEmployee.role}</strong>
              </Typography>
              
              <TextField
                fullWidth
                margin="normal"
                label="Month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Payment Mode"
                select
                defaultValue="Bank Transfer"
                required
              >
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handlePayment} color="primary" variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Salaries;