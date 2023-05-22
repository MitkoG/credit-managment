// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS82Fw6gSGQ66PnEuxSqxg6DYkuv1C2Nc",
  authDomain: "credit-management-56bba.firebaseapp.com",
  projectId: "credit-management-56bba",
  storageBucket: "credit-management-56bba.appspot.com",
  messagingSenderId: "335343661542",
  appId: "1:335343661542:web:c333a6099a60b731eba627",
  measurementId: "G-TEDX5FZN8S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const loansCollection = collection(db, 'loans');
export const paymentsCollection = collection(db, 'payments');

export default app;
