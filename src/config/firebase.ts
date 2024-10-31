// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCkQ1mHCUvbZ3lHz28TO9bY3dU_lBUebeE",
  authDomain: "mental-peace-7c5ac.firebaseapp.com",
  projectId: "mental-peace-7c5ac",
  storageBucket: "mental-peace-7c5ac.firebasestorage.app",
  messagingSenderId: "75922155174",
  appId: "1:75922155174:web:0e877e439f570623f5b667",
  measurementId: "G-EEER582EGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);