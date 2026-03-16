// Import Firebase modulů
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyDMyNNzTJNEnqjweh4jYV3dcKYRryKQV6s",
  authDomain: "otomcomezajima.firebaseapp.com",
  projectId: "otomcomezajima",
  storageBucket: "otomcomezajima.firebasestorage.app",
  messagingSenderId: "877522454478",
  appId: "1:877522454478:web:9e9f5b15ee169fe0f18d9f",
  measurementId: "G-FYJWL9GN7B"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);