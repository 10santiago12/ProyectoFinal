import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
  Dimensions,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFavorites } from "@/context/FavoritesContext";

const { width } = Dimensions.get("window");

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [offers, setOffers] = useState<any[]>([]);
  const { addFavorite } = useFavorites();

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
        setOffers([]);
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
        const ext = uri.split('.').pop();
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
      } else {
        setProductName("No se reconoció");
      }
    } catch {
      Alert.alert("Error", "No se pudo analizar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/search-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });
      const data = await res.json();
      if (res.ok) setOffers(data.offers);
      else Alert.alert("Error", "No se encontraron ofertas");
    } catch {
      Alert.alert("Error", "No se pudieron obtener las ofertas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <TouchableOpacity style={styles.button} onPress={pickImage} disabled={loading}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.previewWrapper}>
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>
      )}

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#3a7d44" />}

      {!loading && productName !== "" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Producto identificado:</Text>
          <Text style={styles.productName}>{productName}</Text>
          <TouchableOpacity style={styles.buttonOutline} onPress={fetchOffers} disabled={loading}>
            <Text style={styles.buttonOutlineText}>Buscar ofertas en eBay</Text>
          </TouchableOpacity>
        </View>
      )}

      {offers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ofertas disponibles:</Text>
          {offers.map((offer, i) => (
            <View key={i} style={styles.offerCard}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerPrice}>Precio: ${offer.price}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(offer.link)}>
                <Text style={styles.offerLink}>Ver oferta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => {
                  addFavorite({
                    title: offer.title,
                    price: offer.price,
                    link: offer.link,
                  }).then(() => {
                    Alert.alert("Favorito agregado", `"${offer.title}" fue agregado a tus favoritos.`);
                  });
                }}
              >
                <Text style={styles.favoriteText}>Guardar en favoritos</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const IMAGE_SIZE = width * 0.3;

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3a7d44',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginVertical: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  loader: {
    marginVertical: 20,
  },
  section: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  productName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#3a7d44',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#f0f8f0',
  },
  buttonOutlineText: {
    color: '#3a7d44',
    fontSize: 16,
    fontWeight: '600',
  },
  offerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  offerTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  offerPrice: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 8,
    fontWeight: '600',
  },
  offerLink: {
    fontSize: 14,
    color: '#1565c0',
    textDecorationLine: 'underline',
  },
  favoriteButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 6,
  },
  favoriteText: {
    color: '#00796b',
    fontWeight: '500',
  },
});