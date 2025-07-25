import { Colors } from "@/constants/Colors";
import { getProductsBySeller } from "@/services/api";
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
import ProductItem from "./product-item";

const ProductList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsBySeller,
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Recommened</Text>
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
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          renderItem={({ item, index }) => (
            <ProductItem item={item} index={index} />
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

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  productImg: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  itemsWrapper: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  productWrapper: {
    width: "50%",
    paddingLeft: 5,
    paddingBottom: 20,
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
