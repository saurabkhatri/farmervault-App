import { getProductById } from "@/services/api";
import { ProductResponse } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const FarmerProductDetails = () => {
  const { productId } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery<ProductResponse>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as string),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2575fc" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2575fc" />
        ) : error ? (
          <Text style={{ color: "#ff6b6b" }}>
            Failed to load product details.
          </Text>
        ) : data ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image
              source={{
                uri:
                  data.images?.[0] ||
                  "https://via.placeholder.com/600x400?text=No+Image",
              }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={styles.productPrice}>${data.price}</Text>
            <Text style={styles.productCategory}>
              Category: {data.category}
            </Text>
            <Text style={styles.productQuantity}>
              Quantity: {data.quantity}
            </Text>
            <Text style={styles.productId}>Product ID: {data._id}</Text>
          </ScrollView>
        ) : (
          <Text>No product found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#2575fc",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  productImage: {
    width: width,
    height: 300,
    borderRadius: 0,
    marginBottom: 18,
    backgroundColor: "#f0f0f0",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2575fc",
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  productId: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
  },
});

export default FarmerProductDetails;
