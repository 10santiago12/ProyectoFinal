import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseconfig";

export default function HomeScreen() {
  const { user } = useAuth();
  const [recentScans, setRecentScans] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentScans = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      const data = snapshot.data();
      if (data?.recentScans) {
        setRecentScans([...data.recentScans].reverse().slice(0, 3));
      }
    };

    fetchRecentScans();
  }, [user]);

  const renderRecentItem = ({ item }: any) => (
    <View style={styles.recentItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productBrand}>Precio: ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PriceScan</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/ProfileScreen")}>
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.scanCard}>
        <Text style={styles.scanTitle}>Scan & Save</Text>
        <Text style={styles.scanSubtitle}>Compare prices across stores and get AI recommendations</Text>
        <TouchableOpacity style={styles.scanButton} onPress={() => router.push("/(app)/scan")}>
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent Scans</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/HistoryScreen")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentScans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecentItem}
        style={{ marginBottom: 20 }}
        ListEmptyComponent={<Text>No hay productos escaneados aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#111" },
  scanCard: { backgroundColor: "#3a7d44", borderRadius: 12, padding: 20, marginBottom: 20 },
  scanTitle: { color: "white", fontWeight: "bold", fontSize: 24, marginBottom: 8 },
  scanSubtitle: { color: "white", fontSize: 14, marginBottom: 15 },
  scanButton: { backgroundColor: "#eaf3e9", paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, alignSelf: "flex-start" },
  scanButtonText: { color: "#3a7d44", fontWeight: "bold", fontSize: 16 },
  recentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  recentTitle: { fontWeight: "bold", fontSize: 18, color: "#111" },
  viewAll: { color: "#3a7d44", fontWeight: "600" },
  recentItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#f6f6f6", borderRadius: 8, padding: 12, marginBottom: 10 },
  productName: { fontWeight: "bold", fontSize: 16 },
  productBrand: { color: "#777" },
});
