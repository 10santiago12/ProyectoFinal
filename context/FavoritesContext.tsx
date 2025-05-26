import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/utils/firebaseconfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface Favorite {
  title: string;
  price: string;
  link: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => Promise<void>;
  removeFavorite: (item: Favorite) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const fetchFavorites = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    const data = snapshot.data();
    if (data && data.favorites) {
      setFavorites(data.favorites);
    } else {
      setFavorites([]);
    }
  };

  const addFavorite = async (item: Favorite) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(item),
    });
    setFavorites(prev => [...prev, item]);
  };

  const removeFavorite = async (item: Favorite) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(item),
    });
    setFavorites(prev => prev.filter(fav => fav.link !== item.link));
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
