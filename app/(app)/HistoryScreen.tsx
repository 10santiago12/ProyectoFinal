// app/(app)/HistoryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext"; // importar contexto de autenticación si necesitas datos usuario
import { router } from "expo-router";

interface HistoryItem {
  id: string;
  title: string;
  date: string;
}

// Simulación de datos, reemplaza con tus datos reales o fetch a API/backend
const data: HistoryItem[] = [
  { id: "1", title: "Historial de compra 1", date: "2024-05-01" },
  { id: "2", title: "Historial de compra 2", date: "2024-05-05" },
  { id: "3", title: "Historial de compra 3", date: "2024-05-10" },
];

export default function HistoryScreen() {
  const { user } = useAuth();

  // Renderiza cada item de historial
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de compras de {user?.displayName || "usuario"}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text>No hay historial disponible</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  item: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  link: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
  },
});