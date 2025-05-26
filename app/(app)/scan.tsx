// app/(app)/scan.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");

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
    setLoading(true);
    try {
      const formData = new FormData();
      if (Platform.OS === "web") {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append("image", blob, "photo.jpg");
      } else {
        const fileExt = uri.split('.').pop();
        formData.append("image", {
          uri,
          type: `image/${fileExt}`,
          name: `photo.${fileExt}`,
        } as any);
      }
      const res = await fetch("http://localhost:3001/api/analyze-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProductName(res.ok ? data.productName || "No se reconoció" : "No se reconoció");
    } catch {
      Alert.alert("Error", "Falló el análisis de la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan & Discover</Text>

      <TouchableOpacity style={styles.scanButton} onPress={pickImage}>
        <Ionicons name="image-outline" size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Seleccionar imagen</Text>
      </TouchableOpacity>

      <View style={styles.previewContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="camera-reverse-outline" size={80} color="#ccc" />
        )}
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#3a7d44" />
        </View>
      )}

      {productName !== "" && !loading && (
        <View style={styles.resultCard}>
          <Ionicons name="pricetag-outline" size={24} color="#3a7d44" />
          <Text style={styles.resultText}>{productName}</Text>
        </View>
      )}
    </View>
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