import React, { createContext, useContext, useEffect, useState } from "react";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
updateProfile,
onAuthStateChanged,
User as FirebaseUser,
} from "firebase/auth";
import {
getFirestore,
doc,
setDoc,
} from "firebase/firestore";
import app from "../utils/firebaseconfig";
import { router } from "expo-router";

interface AuthContextType {
user: FirebaseUser | null;
loading: boolean;
login: (email: string, password: string) => Promise<void>;
register: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
) => Promise<void>;
logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
const auth = getAuth(app);
const firestore = getFirestore(app);

const [user, setUser] = useState<FirebaseUser | null>(null);
const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    });
    return () => unsubscribe();
}, []);

const login = async (email: string, password: string) => {
    setLoading(true);
    try {
    await signInWithEmailAndPassword(auth, email, password);
    router.replace("/(app)/mainpage");
    } catch (error: any) {
    throw new Error("Invalid email or password.");
    } finally {
    setLoading(false);
    }
};

const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
) => {
    setLoading(true);

    if (password !== confirmPassword) {
    setLoading(false);
    throw new Error("Passwords do not match.");
    }

    if (password.length < 8) {
    setLoading(false);
    throw new Error("Password must be at least 8 characters.");
    }

    if (!/[A-Z]/.test(password)) {
    setLoading(false);
    throw new Error("Password must contain at least one uppercase letter.");
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
    setLoading(false);
    throw new Error("Password must contain at least one special character.");
    }

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`,
    });

    const userRef = doc(firestore, "users", firebaseUser.uid);
    await setDoc(userRef, {
        uid: firebaseUser.uid,
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
    });

    setUser(firebaseUser);
    router.replace("/(app)/mainpage");
    } catch (error: any) {
    if (error.message.includes("email-already-in-use")) {
        throw new Error("Email is already registered.");
    } else {
        throw new Error("Registration failed. Try again.");
    }
    } finally {
    setLoading(false);
    }
};

const logout = async () => {
    setLoading(true);
    try {
    await signOut(auth);
    setUser(null);
    router.replace("/auth");
    } catch (error: any) {
    throw new Error("Logout failed.");
    } finally {
    setLoading(false);
    }
};

return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
    {children}
    </AuthContext.Provider>
);
};