// app/(app)/PriceHistoryScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

interface PriceHistoryItem {
  id: string;
  productName: string;
  price: number;
  date: string;
}

// Aquí puedes reemplazar este mock con la llamada real a tu backend o Firebase
const mockPriceHistoryData: PriceHistoryItem[] = [
  { id: "1", productName: "Producto A", price: 12.5, date: "2024-05-01" },
  { id: "2", productName: "Producto B", price: 10.0, date: "2024-05-03" },
  { id: "3", productName: "Producto C", price: 15.2, date: "2024-05-07" },
];

export default function PriceHistoryScreen() {
  const { user } = useAuth();
  const [data, setData] = useState<PriceHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simula llamada a API o base de datos
    const fetchData = async () => {
      try {
        setLoading(true);
        // Aquí pondrías tu lógica real para obtener los datos, por ejemplo:
        // const response = await fetch('https://tuapi.com/pricehistory?uid=' + user?.uid);
        // const result = await response.json();
        // setData(result);
        // Por ahora usamos el mock:
        await new Promise((r) => setTimeout(r, 1000)); // simula retardo
        setData(mockPriceHistoryData);
      } catch (error) {
        console.error("Error cargando historial de precios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const renderItem = ({ item }: { item: PriceHistoryItem }) => (
    <View style={styles.item}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.price}>Precio: ${item.price.toFixed(2)}</Text>
      <Text style={styles.date}>Fecha: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Historial de precios {user?.displayName ? `de ${user.displayName}` : ""}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00aa00" />
      ) : data.length === 0 ? (
        <Text style={styles.noData}>No hay historial de precios disponible.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    backgroundColor: "#e0f2e9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    color: "#006400",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  noData: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
  },
});