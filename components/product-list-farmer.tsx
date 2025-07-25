import { Colors } from "@/constants/Colors";
import { getProductsBySeller } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductItemFarmer from "./product-item-farmer";

const ProductListFarmer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsBySeller,
  });

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerRow}>
        <Link href="/add-product" asChild>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add Product</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.card}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginVertical: 40 }}
          />
        ) : data && data.length > 0 ? (
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item._id}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item, index }) => (
              <ProductItemFarmer item={item} index={index} />
            )}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginVertical: 40,
              color: Colors.gray,
            }}
          >
            No products found.
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProductListFarmer;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
    fontWeight: "400",
  },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    minHeight: 200,
  },
});
