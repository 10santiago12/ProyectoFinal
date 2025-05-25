import React, { useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await uploadImage(uri);
    }
  };

const uploadImage = async (uri: string) => {
    try {
        setLoading(true);
        const formData = new FormData();

        if (Platform.OS === "web") {
        // 🖥 Web usa fetch con File directamente
        const response = await fetch(uri);
        const blob = await response.blob();

        formData.append("image", blob, "photo.jpg");
        } else {
        // 📱 Android / iOS usa uri directo
        const fileExtension = uri.split(".").pop();
        formData.append("image", {
            uri,
            type: `image/${fileExtension}`,
            name: `photo.${fileExtension}`,
        } as any);
        }

        const res = await fetch("http://localhost:3001/api/analyze-image", {
        method: "POST",
        body: formData,
        });

        const data = await res.json();

        if (res.ok) {
        setProductName(data.productName || "No se reconoció");
        } else {
        console.warn("Respuesta del backend:", data);
        setProductName("No se reconoció");
        }
    } catch (error) {
        Alert.alert("Error", "No se pudo analizar la imagen.");
        console.error("❌ Error al subir la imagen:", error);
    } finally {
        setLoading(false);
    }
    };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        productName ? <Text style={{ marginTop: 20 }}>🛍 Producto: {productName}</Text> : null
      )}
    </View>
  );
}