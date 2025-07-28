import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const authService = {
  // Function to register a new user (e.g., by an admin)
  // This creates the Firebase Auth user AND adds their role/branch to Firestore
  registerUser: async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user details and role to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: userData.role || 'employee', // default role
        branch: userData.branch || null,
        name: userData.name || 'New User',
        createdAt: new Date(),
        // Add more fields as needed
      });
      console.log("User registered and data added to Firestore:", user.uid);
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Function to send a password reset email
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  },

  // Function to update the current user's password
  updateCurrentUserPassword: async (newPassword) => {
    try {
      if (auth.currentUser) {
        await firebaseUpdatePassword(auth.currentUser, newPassword);
        console.log("Password updated successfully for current user.");
      } else {
        throw new Error("No current user logged in to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },

  // Get user details from Firestore by UID
  getUserData: async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        console.log("No user data found for UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Update user data in Firestore
  updateUserData: async (uid, data) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, data);
      console.log("User data updated for UID:", uid);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },
};

export default authService;