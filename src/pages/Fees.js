import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink
import ReceiptPdf from '../utils/pdfGenerators'; // Import your PDF component
import { format } from 'date-fns'; // For formatting dates

// Dummy data for demonstration - in a real app, this would come from Firebase
const students = [
  { id: 'NT001001', name: 'Alice Johnson', course: 'Class 10 Math', due: 10000, paid: 5000 },
  { id: 'NT001002', name: 'Bob Smith', course: 'Class 12 Physics', due: 7000, paid: 8000 },
  { id: 'NT001003', name: 'Charlie Brown', course: 'Class 9 Science', due: 0, paid: 10000 },
];

function Fees() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [searchTerm, setSearchTerm] = useState('');
  const [receiptGenerated, setReceiptGenerated] = useState(null); // State to hold receipt details

  const handlePayment = () => {
    if (selectedStudent && amount > 0 && amount <= selectedStudent.due) {
      const newDue = selectedStudent.due - parseInt(amount);
      const newPaid = selectedStudent.paid + parseInt(amount);

      // In a real application, you would update Firebase here
      // For demonstration, we'll simulate the update and generate a receipt
      const receiptDetails = {
        date: format(new Date(), 'dd-MM-yyyy HH:mm'),
        receiptId: `REC-${Date.now()}`, // Simple ID, use a proper generator in real app
        studentName: selectedStudent.name,
        studentId: selectedStudent.id,
        course: selectedStudent.course,
        amount: parseInt(amount),
        paymentMode: paymentMode,
        previousDue: selectedStudent.due,
        newDue: newDue,
        totalPaidTillDate: newPaid,
      };

      setReceiptGenerated(receiptDetails);
      alert(`Payment of ₹${amount} collected from ${selectedStudent.name}. Receipt generated.`);

      // Reset form and selected student after successful payment
      setSelectedStudent(null);
      setAmount('');
      setPaymentMode('Cash');

      // OPTIONAL: Update the local 'students' array for immediate UI reflection
      const updatedStudents = students.map(s =>
        s.id === selectedStudent.id ? { ...s, due: newDue, paid: newPaid } : s
      );
      // You would then re-fetch or update the state that holds your student data
      // For this example, we are using a static array so this update won't persist
    } else if (amount <= 0) {
        alert("Please enter a valid amount to collect.");
    } else if (amount > selectedStudent.due) {
        alert(`Payment amount (${amount}) cannot exceed outstanding due (${selectedStudent.due}).`);
    }
  };

  const filteredStudents = students.filter(student =>
    student.due > 0 &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Fee Collection</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SearchIcon sx={{ mr: 1 }} />
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">Due</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        hover
                        selected={selectedStudent?.id === student.id}
                        onClick={() => {
                            setSelectedStudent(student);
                            setAmount(student.due > 0 ? student.due.toString() : ''); // Pre-fill with full due
                            setReceiptGenerated(null); // Clear any previous receipt
                        }}
                      >
                        <TableCell>
                          <Typography fontWeight="bold">{student.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{student.id}</Typography>
                        </TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`₹${student.due}`}
                            color="error"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStudents.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                                No students with outstanding fees found.
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Collect Payment
              </Typography>

              {selectedStudent ? (
                <Box>
                  <Box mb={3}>
                    <Typography>Student: <strong>{selectedStudent.name}</strong></Typography>
                    <Typography variant="body2" color="textSecondary">ID: {selectedStudent.id}</Typography>
                    <Typography variant="body2">Course: {selectedStudent.course}</Typography>
                    <Typography variant="body1" mt={1}>
                      Total Due: <strong>₹{selectedStudent.due}</strong>
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Amount (₹)"
                    type="number"
                    margin="normal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputProps={{ min: 1, max: selectedStudent.due }} // Ensure amount is positive and not more than due
                  />

                  <TextField
                    fullWidth
                    label="Payment Mode"
                    select
                    margin="normal"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Card">Card</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  </TextField>

                  <Box mt={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handlePayment}
                      disabled={!amount || parseInt(amount) <= 0 || parseInt(amount) > selectedStudent.due}
                    >
                      Collect Payment
                    </Button>
                  </Box>

                  {receiptGenerated && (
                    <Box mt={2}>
                      <PDFDownloadLink
                        document={<ReceiptPdf receiptDetails={receiptGenerated} />}
                        fileName={`receipt-${receiptGenerated.receiptId}.pdf`}
                      >
                        {({ blob, url, loading, error }) =>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="success"
                            disabled={loading}
                            sx={{ mt: 1 }}
                          >
                            {loading ? 'Generating PDF...' : 'Download Receipt PDF'}
                          </Button>
                        }
                      </PDFDownloadLink>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography color="textSecondary">
                  Select a student from the left to collect payment.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Fees;