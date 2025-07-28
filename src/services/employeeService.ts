import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

const employeesRef = collection(db, 'employees');

export const addEmployee = async (employeeData) => {
  try {
    const docRef = await addDoc(employeesRef, employeeData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getEmployees = async (branchId = null) => {
  try {
    let q;
    if (branchId) {
      q = query(employeesRef, where('branchId', '==', branchId));
    } else {
      q = employeesRef;
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (employeeId, updateData) => {
  try {
    const employeeDoc = doc(db, 'employees', employeeId);
    await updateDoc(employeeDoc, updateData);
  } catch (error) {
    throw error;
  }
};
