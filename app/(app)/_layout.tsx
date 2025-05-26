// app/(app)/_layout.tsx
import React from 'react';
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen name="mainpage" options={{ title: "Inicio" }} />
      <Tabs.Screen name="scan" options={{ title: "Escanear" }} />
      <Tabs.Screen name="HistoryScreen" options={{ title: "Historial" }} />
      <Tabs.Screen name="PriceHistoryScreen" options={{ title: "Precios" }} />
      <Tabs.Screen name="ProductScreen" options={{ title: "Producto" }} />
      <Tabs.Screen name="ProfileScreen" options={{ title: "Perfil" }} />
      <Tabs.Screen name="ScannerScreen" options={{ title: "Scanner" }} />
      <Tabs.Screen name="HomeScreen" options={{ title: "Home" }} />
      <Tabs.Screen name="AuthScreen" options={{ title: "Autenticación", tabBarButton: () => null, headerShown: false }} />
      {/* Si no quieres que AuthScreen aparezca en el tab bar, puedes ocultarlo */}
    </Tabs>
  );
}