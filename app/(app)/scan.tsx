// app/(app)/scan.tsx
import React, { useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, Alert, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [offers, setOffers] = useState<any[]>([]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        setProductName("");
        await uploadImage(uri);
      }
    } catch {
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a7d44',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  previewContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    elevation: 2,
  },
  resultText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
});