// app/(app)/ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!user) {
    router.replace("/auth");
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de usuario</Text>

      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{user.displayName || "No disponible"}</Text>

      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Button title="Cerrar sesión" onPress={handleLogout} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  button: {
    marginTop: 15,
  },
});