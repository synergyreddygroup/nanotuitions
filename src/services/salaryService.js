import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, where, orderBy } from 'firebase/firestore';

const salariesCollectionRef = collection(db, "salaries");

const salaryService = {
  // Record a new salary payment
  addSalaryPayment: async (paymentData) => {
    try {
      const newPaymentRef = await addDoc(salariesCollectionRef, {
        ...paymentData,
        paymentDate: new Date(), // Store timestamp
      });
      console.log("New salary payment recorded with ID:", newPaymentRef.id);
      return newPaymentRef.id;
    } catch (error) {
      console.error("Error recording salary payment:", error);
      throw error;
    }
  },

  // Get all salary payments
  getAllSalaryPayments: async () => {
    try {
      const q = query(salariesCollectionRef, orderBy("paymentDate", "desc"));
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching salary payments:", error);
      throw error;
    }
  },

  // Get salary payments for a specific employee
  getEmployeeSalaryPayments: async (employeeId) => {
    try {
      const q = query(salariesCollectionRef, where("employeeId", "==", employeeId), orderBy("paymentDate", "desc"));
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching employee salary payments:", error);
      throw error;
    }
  },
  // You might also need to update employee's lastPaidDate after a successful salary payment
  // employeeService.updateEmployee(employeeId, { lastPaid: new Date().toISOString().split('T')[0] });
};

export default salaryService;