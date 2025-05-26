import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Linking } from "react-native";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = async (item: any) => {
    await removeFavorite(item);
    Alert.alert("Eliminado", `"${item.title}" fue eliminado de tus favoritos.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.priceText}>Precio: ${item.price}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.link}>Ver oferta</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Text style={styles.remove}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tienes productos favoritos aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#3a7d44" },
  item: { flexDirection: "row", padding: 15, backgroundColor: "#f0f0f0", borderRadius: 10, marginBottom: 10 },
  titleText: { fontSize: 16, fontWeight: "600" },
  priceText: { fontSize: 14, color: "#555", marginBottom: 5 },
  link: { fontSize: 14, color: "#007aff", textDecorationLine: "underline" },
  remove: { fontSize: 22, color: "#d32f2f", paddingLeft: 10 },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
});
