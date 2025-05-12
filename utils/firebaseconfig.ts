import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCEDLoVKXEwZ2cUEfAGB1-yB9Ja1rQSXL8",
authDomain: "proyectofinalmovil-f0bf3.firebaseapp.com",
projectId: "proyectofinalmovil-f0bf3",
storageBucket: "proyectofinalmovil-f0bf3.firebasestorage.app",
messagingSenderId: "916846341143",
appId: "1:916846341143:web:8f1414a0e5be73e8074052"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default app;