import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido{user ? `, ${user.displayName}` : ""}!</Text>
      <Text style={styles.subtitle}>Esta es la pantalla principal de la aplicación.</Text>

      <Button title="Cerrar sesión" onPress={handleLogout} />

      <View style={styles.button}>
        <Button
          title="Ir a perfil"
          onPress={() => router.push("/(app)/ProfileScreen")}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Ir al escáner"
          onPress={() => router.push("/(app)/scan")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
  },
});