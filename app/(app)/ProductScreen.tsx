// app/(app)/ProductScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

interface ProductScreenProps {
  // Aquí puedes definir props si usas navegación con parámetros
}

export default function ProductScreen() {
  const { user } = useAuth();

  // Aquí podrías agregar lógica para cargar el producto desde parámetros o API
  const product = {
    name: "Producto Ejemplo",
    description: "Descripción detallada del producto.",
    price: 29.99,
    stock: 10,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{product.description}</Text>

      <Text style={styles.label}>Precio:</Text>
      <Text style={styles.text}>${product.price.toFixed(2)}</Text>

      <Text style={styles.label}>Stock disponible:</Text>
      <Text style={styles.text}>{product.stock}</Text>

      {user && (
        <View style={styles.button}>
          <Button
            title="Ver perfil"
            onPress={() => router.push("/(app)/ProfileScreen")}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  button: {
    marginTop: 20,
  },
});