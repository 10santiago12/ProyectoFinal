// app/(app)/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Si no hay usuario, redirige al login
  if (!user) {
    router.replace("/auth");
    return null;
  }

  // Maneja cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      {/* Opción: Ver / Editar información */}
      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => router.push("/(app)/PersonalInfoScreen")}
      >
        <Text style={styles.optionText}>Ver / Editar información</Text>
      </TouchableOpacity>

      {/* Opción: Cerrar sesión */}
      <TouchableOpacity
        style={[styles.optionCard, styles.logoutCard]}
        onPress={handleLogout}
      >
        <Text style={[styles.optionText, styles.logoutText]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  logoutCard: {
    backgroundColor: '#ffe5e0',
  },
  logoutText: {
    color: '#d9534f',
    fontWeight: '600',
  },
});