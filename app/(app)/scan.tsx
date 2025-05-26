import React, { useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, Alert, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [offers, setOffers] = useState<any[]>([]);

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
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append("image", blob, "photo.jpg");
      } else {
        const ext = uri.split(".").pop();
        formData.append("image", {
          uri,
          type: `image/${ext}`,
          name: `photo.${ext}`,
        } as any);
      }

      const res = await fetch("http://localhost:3001/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProductName(data.productName || "No se reconoció");
        setOffers([]);
      } else {
        console.warn("❌ Backend:", data);
        setProductName("No se reconoció");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo analizar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/search-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });

      const data = await res.json();

      if (res.ok) {
        setOffers(data.offers);
      } else {
        Alert.alert("No se encontraron ofertas");
      }
    } catch (err) {
      Alert.alert("Error", "No se pudieron obtener las ofertas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      {loading && <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />}
      {!loading && productName && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>🛍 Producto identificado:</Text>
          <Text>{productName}</Text>
          <Button title="Buscar ofertas en eBay" onPress={fetchOffers} />
        </View>
      )}
      {offers.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>💸 Ofertas:</Text>
          {offers.map((offer, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text>📌 {offer.title}</Text>
              <Text>💲 {offer.price}</Text>
              <Text>🔗 {offer.link}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}