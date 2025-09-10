import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "cittr0-4fdee.firebaseapp.com",
  projectId: "cittr0-4fdee",
  storageBucket: "cittr0-4fdee.appspot.com",
  messagingSenderId: "916083075078",
  appId: "1:916083075078:web:5ba941bc62452a0f80e87",
  measurementId: "G-K45WEDZP9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);
