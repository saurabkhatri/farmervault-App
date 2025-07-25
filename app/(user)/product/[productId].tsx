import { Colors } from "@/constants/Colors";
import { getProductById } from "@/services/api";
import { ProductResponse } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetails = () => {
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
                  "https://via.placeholder.com/300x300?text=No+Image",
              }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={styles.productPrice}>${data.price}</Text>
            <Text style={styles.productCategory}>
              Category: {data.category}
            </Text>
            <Text style={styles.productQuantity}>
              Quantity: {data.quantity}
            </Text>
            {typeof data.seller === "object" && (
              <Text style={styles.sellerName}>
                Seller: {data.seller.fullName}
              </Text>
            )}
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
    paddingHorizontal: 24,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  productImage: {
    width: 260,
    height: 260,
    borderRadius: 16,
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
  sellerName: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  productId: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
  },
  addToCartBtn: {
    backgroundColor: "#2575fc",
    borderRadius: 10,
    marginTop: 22,
    paddingVertical: 14,
    alignItems: "center",
    width: 220,
    alignSelf: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  inCartBtn: {
    backgroundColor: Colors.gray,
  },
  inCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 2,
  },
  qtyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 36,
  },
  qtyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    minWidth: 28,
    textAlign: "center",
  },
});

export default ProductDetails;
