import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const feePaymentsRef = collection(db, 'feePayments');

export const addFeePayment = async (paymentData) => {
  try {
    const docRef = await addDoc(feePaymentsRef, paymentData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getFeePayments = async (branchId, studentId = null) => {
  try {
    let q;
    if (studentId) {
      q = query(feePaymentsRef, where('branchId', '==', branchId), where('studentId', '==', studentId));
    } else {
      q = query(feePaymentsRef, where('branchId', '==', branchId));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};