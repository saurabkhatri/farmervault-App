import { Colors } from "@/constants/Colors";
import { ProductResponse } from "@/types/type";
import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  index: number;
  item: ProductResponse;
  imageStyle?: any;
};

const width = Dimensions.get("window").width - 40;

const ProductItem = ({ item, index, imageStyle }: Props) => {
  const imageUrl =
    item.images && item.images.length > 0 ? item.images[0] : undefined;
  return (
    <Link href={`/product/${item._id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.container}
          entering={FadeInDown.delay(300 + index * 100).duration(500)}
        >
          <Image
            source={{
              uri:
                imageUrl || "https://via.placeholder.com/200x200?text=No+Image",
            }}
            style={[styles.image, imageStyle]}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text style={styles.price}>${item.price}</Text>
            <Text style={{ marginLeft: 8, color: Colors.gray, fontSize: 13 }}>
              Qty: {item.quantity}
            </Text>
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.categoryBadge}>{item.category}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  bookmarkBtn: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 5,
    borderRadius: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    letterSpacing: 1.1,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  categoryBadge: {
    backgroundColor: Colors.primary,
    color: "#fff",
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    marginTop: 4,
    overflow: "hidden",
  },
});
