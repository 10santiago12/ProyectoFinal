// app/(app)/PersonalInfoScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function PersonalInfoScreen() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();

  // Estados locales
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Validación", "Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile({ displayName: name, email });
      Alert.alert("Éxito", "Información actualizada correctamente.");
      setEditMode(false);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "No se pudo actualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.header}>{editMode ? 'Editar Información' : 'Mi Información'}</Text>

      {/* Modo visualización */}
      {!editMode && (
        <View style={styles.infoCard}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{user.displayName}</Text>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      )}

      {/* Formulario edición */}
      {editMode && (
        <>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre completo"
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, styles.cancelButton]}
            onPress={() => setEditMode(false)}
            disabled={loading}
          >
            <Text style={[styles.saveButtonText, styles.cancelText]}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Botón para cambiar modo */}
      {!editMode && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditMode(true)}
        >
          <Text style={styles.editButtonText}>Editar información</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  saveButton: {
    backgroundColor: "#3a7d44",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 12,
  },
  cancelText: {
    color: "#333",
  },
  editButton: {
    backgroundColor: "#eaf3e9",
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#3a7d44",
    fontSize: 16,
    fontWeight: "600",
  },
});