import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc0u-Q2VymIxMJ0tRfGkJJTjItZWUJO5U",
  authDomain: "nexus-d0428.firebaseapp.com",
  projectId: "nexus-d0428",
  storageBucket: "nexus-d0428.firebasestorage.app",
  messagingSenderId: "556840653591",
  appId: "1:556840653591:web:cd4ec11f266534fc2b5d52",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
