// app/(app)/AuthScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function AuthScreen() {
  const { login, register, loading } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);

  // Campos comunes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Campos registro
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Error de inicio de sesión", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password, confirmPassword, firstName, lastName);
    } catch (error: any) {
      Alert.alert("Error de registro", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Regístrate" : "Iniciar Sesión"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
            editable={!loading}
          />
        </>
      )}

      <Button
        title={loading ? "Cargando..." : isRegistering ? "Registrar" : "Ingresar"}
        onPress={isRegistering ? handleRegister : handleLogin}
        disabled={loading}
      />

      <TouchableOpacity
        onPress={() => setIsRegistering(!isRegistering)}
        disabled={loading}
        style={styles.switchContainer}
      >
        <Text style={styles.switchText}>
          {isRegistering
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    color: "#0066cc",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});