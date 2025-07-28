import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a font to avoid font issues in PDF generation
// You might need to download a .ttf font file and link it here
// For example: Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.ttf' });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica', // Or your registered font
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 15,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#eeeeee',
    padding: 5,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
});

const ReceiptPdf = ({ receiptDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Nano Tuitions - Fee Receipt</Text>

      <View style={styles.section}>
        <Text style={styles.text}>Date: {receiptDetails.date}</Text>
        <Text style={styles.text}>Receipt ID: {receiptDetails.receiptId}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Student Details:</Text>
        <Text style={styles.text}>Name: {receiptDetails.studentName}</Text>
        <Text style={styles.text}>Student ID: {receiptDetails.studentId}</Text>
        <Text style={styles.text}>Course: {receiptDetails.course}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Payment Details:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.text}>Description</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.text}>Mode</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.text}>Amount (₹)</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.text}>Fee Payment</Text></View>
            <View style={styles.tableCol}><Text style={styles.text}>{receiptDetails.paymentMode}</Text></View>
            <View style={styles.tableCol}><Text style={styles.text}>{receiptDetails.amount.toLocaleString()}</Text></View>
          </View>
        </View>
        <Text style={[styles.text, { marginTop: 10, textAlign: 'right', fontWeight: 'bold' }]}>
          Total Paid: ₹{receiptDetails.amount.toLocaleString()}
        </Text>
        <Text style={[styles.text, { textAlign: 'right', fontWeight: 'bold' }]}>
          Outstanding Due: ₹{receiptDetails.newDue.toLocaleString()}
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.text}>Note: This is a system-generated receipt and does not require a signature.</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPdf;