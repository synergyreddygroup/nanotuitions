// Import the Firebase functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL429yjvjQFPQOQrn1rOcWjvtriBIBf2Y",
  authDomain: "nano-tuitions.firebaseapp.com",
  projectId: "nano-tuitions",
  storageBucket: "nano-tuitions.firebasestorage.app",
  messagingSenderId: "123871351451",
  appId: "1:123871351451:web:d69fae9ff30602540aac3e",
  measurementId: "G-28NQ9JSEH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: Only works in browser environments
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };
