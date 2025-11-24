// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBg2LxyP74S34qvn51ItSZsljlJ5N6gPnw",
  authDomain: "casino-2c811.firebaseapp.com",
  projectId: "casino-2c811",
  storageBucket: "casino-2c811.firebasestorage.app",
  messagingSenderId: "728868971955",
  appId: "1:728868971955:web:76c9014e5e9e743aaa57c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
