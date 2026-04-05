// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKXZGHtufjkFW6QCvm-A6op_zNhQTHwFw",
  authDomain: "instagram-app-clone-be4b9.firebaseapp.com",
  projectId: "instagram-app-clone-be4b9",
  storageBucket: "instagram-app-clone-be4b9.firebasestorage.app",
  messagingSenderId: "202261390558",
  appId: "1:202261390558:web:4c0ff440fbf372e69d4e4f",
  measurementId: "G-TKGQ5LCTEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
