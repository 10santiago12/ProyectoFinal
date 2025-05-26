import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Para iconos, instala expo/vector-icons si no lo tienes

// Datos de ejemplo recientes (simulan scans recientes)
const recentScans = [
  {
    id: "1",
    name: "Wireless Headphones XS-500",
    brand: "SoundTech",
    price: 89.99,
    image: require("../../assets/ejemplos/audifonos.png"), // Usa imagen placeholder local o url real
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    brand: "TechGear",
    price: 129.99,
    image: require("../../assets/ejemplos/audifonos.png"),
  },
  {
    id: "3",
    name: "Bluetooth Speaker Mini",
    brand: "AudioPlus",
    price: 49.99,
    image: require("../../assets/ejemplos/audifonos.png"),
  },
];

export default function HomeScreen() {
  const { user } = useAuth();

  // Renderiza cada producto reciente
  const renderRecentItem = ({ item }: any) => (
    <View style={styles.recentItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
      </View>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PriceScan</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/ProfileScreen")}>
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tarjeta Scan & Save */}
      <View style={styles.scanCard}>
        <Text style={styles.scanTitle}>Scan & Save</Text>
        <Text style={styles.scanSubtitle}>Compare prices across stores and get AI recommendations</Text>
        <TouchableOpacity style={styles.scanButton} onPress={() => router.push("/(app)/scan")}>
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Scans */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent Scans</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/HistoryScreen")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentScans}
        keyExtractor={(item) => item.id}
        renderItem={renderRecentItem}
        style={{ marginBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },
  scanCard: {
    backgroundColor: "linear-gradient(90deg, #3a7d44 0%, #6bb76f 100%)", // El gradiente no se aplica así en React Native, usar LinearGradient de expo-linear-gradient
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  scanTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  scanSubtitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 15,
  },
  scanButton: {
    backgroundColor: "#eaf3e9",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  scanButtonText: {
    color: "#3a7d44",
    fontWeight: "bold",
    fontSize: 16,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recentTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111",
  },
  viewAll: {
    color: "#3a7d44",
    fontWeight: "600",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productBrand: {
    color: "#777",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3a7d44",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bigButton: {
    flex: 1,
    backgroundColor: "#f5faf5",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },
  iconCircle: {
    backgroundColor: "#d7f0d8",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },
  buttonSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});