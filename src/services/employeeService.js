import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import authService from './authService'; // To handle Firebase Auth related operations for employees

const employeesCollectionRef = collection(db, "employees"); // Assuming you store employee details in 'employees' collection

const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const data = await getDocs(employeesCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  // Add a new employee (handles both Auth and Firestore record)
  addEmployee: async (employeeData) => {
    try {
      // First, register the user with Firebase Authentication
      const user = await authService.registerUser(employeeData.email, employeeData.password, {
        role: employeeData.role,
        branch: employeeData.branch,
        name: employeeData.name,
      });

      // Then, add the employee's specific details to the 'employees' collection
      const newEmployeeRef = await addDoc(employeesCollectionRef, {
        firebaseUid: user.uid, // Link to Firebase Auth User
        name: employeeData.name,
        email: employeeData.email,
        role: employeeData.role,
        branch: employeeData.branch,
        baseSalary: employeeData.baseSalary || 0,
        status: 'active', // Default status
        createdAt: new Date(),
      });
      console.log("New employee added with ID:", newEmployeeRef.id, "and Firebase UID:", user.uid);
      return newEmployeeRef.id;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  // Update an existing employee's Firestore data
  updateEmployee: async (id, updatedData) => {
    try {
      const employeeDoc = doc(db, "employees", id);
      await updateDoc(employeeDoc, updatedData);
      console.log("Employee updated:", id);
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  // Deactivate/Delete an employee (consider soft delete or just deactivating Auth user)
  deactivateEmployee: async (id) => {
    try {
      const employeeDoc = doc(db, "employees", id);
      await updateDoc(employeeDoc, { status: 'inactive' });
      // Optionally, disable Firebase Auth user: await auth.updateUser(firebaseUid, { disabled: true });
      console.log("Employee deactivated:", id);
    } catch (error) {
      console.error("Error deactivating employee:", error);
      throw error;
    }
  },
};

export default employeeService;