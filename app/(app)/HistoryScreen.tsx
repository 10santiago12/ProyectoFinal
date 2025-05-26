import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseconfig";

export default function HistoryScreen() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      const data = snapshot.data();
      if (data?.recentScans) {
        setHistory([...data.recentScans].reverse());
      }
    };

    fetchHistory();
  }, [user]);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Precio: ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Historial de Scans</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay historial aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#3a7d44" },
  item: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#777" },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
});
