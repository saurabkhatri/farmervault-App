import { Colors } from "@/constants/Colors";
import { useCart } from "@/context/cart-context";
import { ProductResponse } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
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

const ProductItemUser = ({ item, index, imageStyle }: Props) => {
  const imageUrl =
    item.images && item.images.length > 0 ? item.images[0] : undefined;
  const { addToCart, cart } = useCart();
  const inCart = cart.some((cartItem) => cartItem._id === item._id);
  const [quantity, setQuantity] = useState(1);
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
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
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
          {!inCart && (
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => addToCart(item)}
              activeOpacity={0.85}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItemUser;

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
  addToCartBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.2,
  },
  inCartBtn: {
    backgroundColor: Colors.gray,
  },
  inCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.2,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 2,
  },
  qtyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32,
  },
  qtyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    minWidth: 24,
    textAlign: "center",
  },
});
