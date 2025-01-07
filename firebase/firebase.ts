// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ6XOcM-88Di6UQebKK8IwRq_gJQOt7r0",
  authDomain: "blog-website-c8429.firebaseapp.com",
  projectId: "blog-website-c8429",
  storageBucket: "blog-website-c8429.firebasestorage.app",
  messagingSenderId: "877742691714",
  appId: "1:877742691714:web:03c864864d2331a100eb9b",
  measurementId: "G-91KBCM085V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
export const auth = getAuth(app);

