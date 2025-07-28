import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, where, orderBy } from 'firebase/firestore';

const feesCollectionRef = collection(db, "fees");

const feeService = {
  // Record a new fee payment
  addFeePayment: async (paymentData) => {
    try {
      const newPaymentRef = await addDoc(feesCollectionRef, {
        ...paymentData,
        paymentDate: new Date(), // Store timestamp
      });
      console.log("New fee payment recorded with ID:", newPaymentRef.id);
      return newPaymentRef.id;
    } catch (error) {
      console.error("Error recording fee payment:", error);
      throw error;
    }
  },

  // Get all fee payments (can be filtered by student/date)
  getAllFeePayments: async () => {
    try {
      const q = query(feesCollectionRef, orderBy("paymentDate", "desc"));
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching fee payments:", error);
      throw error;
    }
  },

  // Get fee payments for a specific student
  getStudentFeePayments: async (studentId) => {
    try {
      const q = query(feesCollectionRef, where("studentId", "==", studentId), orderBy("paymentDate", "desc"));
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching student fee payments:", error);
      throw error;
    }
  },

  // You might also need a function to update student's total paid/due amount
  // This would typically be called after `addFeePayment` successfully
  // studentService.updateStudentFeeStatus(studentId, newPaidAmount, newDueAmount);
};

export default feeService;