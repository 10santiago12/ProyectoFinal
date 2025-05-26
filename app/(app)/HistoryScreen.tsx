// app/(app)/HistoryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function HistoryScreen() {
  const { user } = useAuth();
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = async (item: any) => {
    await removeFavorite(item);
    Alert.alert("Favorito eliminado", `"${item.title}" fue eliminado de tus favoritos.`);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Precio: ${item.price}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
        <Text style={styles.link}>Ver producto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item)}>
        <Text style={styles.removeText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tus favoritos, {user?.displayName || "usuario"}</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.link}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text>No tienes productos guardados.</Text>}
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
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#2e7d32",
  },
  link: {
    marginTop: 6,
    color: "#1565c0",
    textDecorationLine: "underline",
  },
  removeBtn: {
    marginTop: 8,
  },
  removeText: {
    color: "red",
    fontWeight: "600",
  },
});