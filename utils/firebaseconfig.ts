// src/utils/firebaseconfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyCEDLoVKXEwZ2cUEfAGB1-yB9Ja1rQSXL8",
  authDomain: "proyectofinalmovil-f0bf3.firebaseapp.com",
  projectId: "proyectofinalmovil-f0bf3",
  storageBucket: "proyectofinalmovil-f0bf3.firebasestorage.app",
  messagingSenderId: "916846341143",
  appId: "1:916846341143:web:8f1414a0e5be73e8074052"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
