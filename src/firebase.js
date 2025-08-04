// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBifR19eES7DbW3y42x-WMgzZlGK7uHFro",
  authDomain: "evenlyo-marketplace.firebaseapp.com",
  projectId: "evenlyo-marketplace",
  storageBucket: "evenlyo-marketplace.firebasestorage.app",
  messagingSenderId: "123456789", // Replace with your actual sender ID
  appId: "40357333457-8ct5c9g0m3rrjscggfhijocgmu869l12.apps.googleusercontent.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, signInWithPopup, signInWithRedirect, getRedirectResult };
