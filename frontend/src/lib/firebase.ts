import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy3tYcoZnI6-L0BbZQC15S7FvK-NIc6Uk",
  authDomain: "alvigo-8bc81.firebaseapp.com",
  projectId: "alvigo-8bc81",
  storageBucket: "alvigo-8bc81.firebasestorage.app",
  messagingSenderId: "690168012047",
  appId: "1:690168012047:web:3cfc7dd1a7bcaec1e7327a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
