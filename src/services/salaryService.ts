import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const salaryPaymentsRef = collection(db, 'salaryPayments');

export const addSalaryPayment = async (paymentData) => {
  try {
    const docRef = await addDoc(salaryPaymentsRef, paymentData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getSalaryPayments = async (employeeId = null) => {
  try {
    let q;
    if (employeeId) {
      q = query(salaryPaymentsRef, where('employeeId', '==', employeeId));
    } else {
      q = salaryPaymentsRef;
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};