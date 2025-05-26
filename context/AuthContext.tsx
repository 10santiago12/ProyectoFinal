// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../utils/firebaseconfig";
import { useRouter } from "expo-router";

interface UpdateProfileData {
  displayName?: string;
  email?: string;
  photoURL?: string;
}

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
  updateUserProfile: (data: UpdateProfileData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const router = useRouter();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Observa cambios de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(app)/mainpage");
    } catch (error) {
      throw new Error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Registro de usuario
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Actualiza displayName en Firebase Auth
      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`,
      });

      // Crea documento en Firestore
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
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("Email is already registered.");
      }
      throw new Error("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      router.replace("/auth");
    } catch {
      throw new Error("Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  // Actualiza perfil del usuario (displayName y/o email)
  const updateUserProfile = async (data: UpdateProfileData) => {
    if (!auth.currentUser) throw new Error("No user logged in.");
    setLoading(true);
    const updates: any = {};

    try {
      // Actualizar displayName o photoURL en Auth
      if (data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }
      // Actualizar email en Auth
      if (data.email && data.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, data.email);
        updates.email = data.email;
      }

      // Actualizar campos en Firestore
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      if (data.displayName) updates.displayName = data.displayName;
      if (updates.email) updates.email = updates.email;

      if (Object.keys(updates).length > 0) {
        await updateDoc(userRef, updates);
      }

      // Refrescar estado de usuario
      setUser(auth.currentUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};