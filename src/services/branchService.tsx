import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const branchesRef = collection(db, 'branches');

export const addBranch = async (branchData) => {
  try {
    const docRef = await addDoc(branchesRef, branchData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getBranches = async () => {
  try {
    const querySnapshot = await getDocs(branchesRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const updateBranch = async (branchId, updateData) => {
  try {
    const branchDoc = doc(db, 'branches', branchId);
    await updateDoc(branchDoc, updateData);
  } catch (error) {
    throw error;
  }
};