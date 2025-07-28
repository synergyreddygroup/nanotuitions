import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

const studentsRef = collection(db, 'students');

export const addStudent = async (studentData) => {
  try {
    const docRef = await addDoc(studentsRef, studentData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getStudents = async (branchId = null) => {
  try {
    let q;
    if (branchId) {
      q = query(studentsRef, where('branchId', '==', branchId));
    } else {
      q = studentsRef;
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (studentId, updateData) => {
  try {
    const studentDoc = doc(db, 'students', studentId);
    await updateDoc(studentDoc, updateData);
  } catch (error) {
    throw error;
  }
};