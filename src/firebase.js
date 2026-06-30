import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA12RKgqhTkE2djDWeP8rrw-KEE-pQAN3I",
  authDomain: "moesportal.firebaseapp.com",
  projectId: "moesportal",
  storageBucket: "moesportal.firebasestorage.app",
  messagingSenderId: "996186802390",
  appId: "1:996186802390:web:92252cb01d8d7d3ecaa177",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
