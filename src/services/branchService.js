import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const branchesCollectionRef = collection(db, "branches");

const branchService = {
  // Get all branches
  getAllBranches: async () => {
    try {
      const data = await getDocs(branchesCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching branches:", error);
      throw error;
    }
  },

  // Add a new branch
  addBranch: async (branchData) => {
    try {
      // You might want to generate a custom ID for branches if required
      const newBranchRef = await addDoc(branchesCollectionRef, {
        ...branchData,
        createdAt: new Date(),
      });
      console.log("New branch added with ID:", newBranchRef.id);
      return newBranchRef.id;
    } catch (error) {
      console.error("Error adding branch:", error);
      throw error;
    }
  },

  // Update an existing branch
  updateBranch: async (id, updatedData) => {
    try {
      const branchDoc = doc(db, "branches", id);
      await updateDoc(branchDoc, updatedData);
      console.log("Branch updated:", id);
    } catch (error) {
      console.error("Error updating branch:", error);
      throw error;
    }
  },

  // Delete a branch
  deleteBranch: async (id) => {
    try {
      const branchDoc = doc(db, "branches", id);
      await deleteDoc(branchDoc);
      console.log("Branch deleted:", id);
    } catch (error) {
      console.error("Error deleting branch:", error);
      throw error;
    }
  },
};

export default branchService;