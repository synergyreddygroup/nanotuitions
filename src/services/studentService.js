import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const studentsCollectionRef = collection(db, "students");

const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const data = await getDocs(studentsCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Add a new student
  addStudent: async (studentData) => {
    try {
      const newStudentRef = await addDoc(studentsCollectionRef, {
        ...studentData,
        createdAt: new Date(),
        status: 'active', // Default status
        totalPaid: studentData.initialPayment || 0, // Initial payment
        dueAmount: studentData.totalFee - (studentData.initialPayment || 0), // Calculate initial due
      });
      console.log("New student admitted with ID:", newStudentRef.id);
      return newStudentRef.id;
    } catch (error) {
      console.error("Error admitting student:", error);
      throw error;
    }
  },

  // Update an existing student
  updateStudent: async (id, updatedData) => {
    try {
      const studentDoc = doc(db, "students", id);
      await updateDoc(studentDoc, updatedData);
      console.log("Student updated:", id);
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  },

  // Delete/Deactivate a student (consider soft delete)
  deleteStudent: async (id) => {
    try {
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc); // Or updateDoc(studentDoc, { status: 'inactive' });
      console.log("Student deleted:", id);
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  },

  // Update student's fee status (called after fee payments)
  updateStudentFeeStatus: async (studentId, amountPaidThisTime) => {
    try {
      const studentDocRef = doc(db, "students", studentId);
      const studentSnap = await getDoc(studentDocRef);

      if (studentSnap.exists()) {
        const currentData = studentSnap.data();
        const newTotalPaid = (currentData.totalPaid || 0) + amountPaidThisTime;
        const newDueAmount = (currentData.dueAmount || 0) - amountPaidThisTime;

        await updateDoc(studentDocRef, {
          totalPaid: newTotalPaid,
          dueAmount: Math.max(0, newDueAmount), // Ensure due doesn't go negative
          lastPaymentDate: new Date(),
        });
        console.log(`Student ${studentId} fee status updated. New due: ${Math.max(0, newDueAmount)}`);
      } else {
        console.warn(`Student with ID ${studentId} not found for fee status update.`);
      }
    } catch (error) {
      console.error("Error updating student fee status:", error);
      throw error;
    }
  },
};

export default studentService;