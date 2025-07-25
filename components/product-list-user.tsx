import { Colors } from "@/constants/Colors";
import { getProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductItemUser from "./product-item-user";

const ProductListUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Recommended</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
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
          renderItem={({ item, index }) => (
            <ProductItemUser item={item} index={index} />
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
  );
};

export default ProductListUser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: Colors.black,
  },
  titleBtn: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.6,
    color: Colors.black,
  },
});
