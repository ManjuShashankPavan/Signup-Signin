import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtRmcL68AO2YI0JpV6e4Y4ouO0tJTuOxU",
  authDomain: "interview-prep-tool-66e94.firebaseapp.com",
  projectId: "interview-prep-tool-66e94",
  storageBucket: "interview-prep-tool-66e94.firebasestorage.app",
  messagingSenderId: "167221184736",
  appId: "1:167221184736:web:79e9d91d850446b37aa885",
  measurementId: "G-TM2L34J6QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };