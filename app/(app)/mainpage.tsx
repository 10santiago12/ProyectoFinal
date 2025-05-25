import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function MainPage() {
  const router = useRouter();

  const goToScanner = () => {
    router.push("/scan"); // O simplemente "/scan" si ya está en la carpeta (app)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Este es el mainpage</Text>

      <TouchableOpacity onPress={goToScanner} style={styles.button}>
        <Text style={styles.buttonText}>Escanear producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});