import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, MenuItem, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';

// Dummy Data
const employees = [
  { id: 'EMP001', name: 'John Doe', role: 'admin', branch: 'Main Branch', baseSalary: 60000, lastPaid: '2024-06-30' },
  { id: 'EMP002', name: 'Jane Smith', role: 'branch', branch: 'Secondary Branch', baseSalary: 45000, lastPaid: '2024-06-30' },
  { id: 'EMP003', name: 'Peter Jones', role: 'employee', branch: 'Main Branch', baseSalary: 30000, lastPaid: '2024-05-31' },
];

function Salaries() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
  const [openDialog, setOpenDialog] = useState(false);

  const handlePaySalary = () => {
    if (selectedEmployee && paymentAmount > 0) {
      console.log(`Paying ₹${paymentAmount} to ${selectedEmployee.name} on ${paymentDate}`);
      alert(`Salary paid to ${selectedEmployee.name}. (Check console)`);
      // In a real app, update Firebase with salary payment record
      setOpenDialog(false);
      setSelectedEmployee(null);
      setPaymentAmount('');
    }
  };

  const calculateDue = (employee) => {
    // Simple logic: if last paid is not current month, assume full base salary due
    const today = new Date();
    const lastPaidDate = employee.lastPaid ? new Date(employee.lastPaid) : null;

    if (!lastPaidDate || lastPaidDate.getMonth() !== today.getMonth() || lastPaidDate.getFullYear() !== today.getFullYear()) {
      return employee.baseSalary;
    }
    return 0; // Already paid for current month
  };

  const employeesWithDue = employees.map(emp => ({
    ...emp,
    due: calculateDue(emp)
  })).filter(emp => emp.due > 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Salary Management</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Base Salary</TableCell>
              <TableCell>Last Paid</TableCell>
              <TableCell align="right">Amount Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesWithDue.length > 0 ? (
              employeesWithDue.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.branch}</TableCell>
                  <TableCell>₹{employee.baseSalary.toLocaleString()}</TableCell>
                  <TableCell>{employee.lastPaid || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`₹${employee.due.toLocaleString()}`}
                      color={employee.due > 0 ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setPaymentAmount(employee.due.toString());
                        setOpenDialog(true);
                      }}
                      disabled={employee.due === 0}
                    >
                      Pay Salary
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">No salaries outstanding.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pay Salary to {selectedEmployee?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Employee ID: <strong>{selectedEmployee?.id}</strong></Typography>
            <Typography variant="body1">Role: {selectedEmployee?.role}</Typography>
            <Typography variant="body1">Branch: {selectedEmployee?.branch}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Amount Due: <strong>₹{selectedEmployee?.due?.toLocaleString()}</strong>
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Amount to Pay (₹)"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              inputProps={{ min: 1, max: selectedEmployee?.due || 0 }}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Payment Date"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePaySalary}
            color="primary"
            variant="contained"
            startIcon={<PaymentIcon />}
            disabled={!paymentAmount || parseInt(paymentAmount) <= 0 || parseInt(paymentAmount) > (selectedEmployee?.due || 0)}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Salaries;