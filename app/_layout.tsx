import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout() {
  return (
      <AuthProvider>
        <FavoritesProvider>
          <Stack>
            <Stack.Screen name="auth"options={{title:"Home", headerShown:false}}/>
            <Stack.Screen name="(app)"options={{title:"Login", headerShown:false}}/>
          </Stack>
        </FavoritesProvider>
      </AuthProvider>
  )
}