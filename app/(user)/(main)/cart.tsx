import { Colors } from "@/constants/Colors";
import { useCart } from "@/context/cart-context";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {cart.map((item) => (
              <View key={item._id} style={styles.itemRow}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    ${item.price} x {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromCart(item._id)}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 18,
    textAlign: "center",
  },
  empty: {
    color: Colors.gray,
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f9fa",
    borderRadius: 12,
    marginBottom: 14,
    padding: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  price: {
    fontSize: 15,
    color: Colors.primary,
    marginTop: 2,
  },
  removeBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  removeBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 14,
    marginTop: 10,
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  clearBtn: {
    backgroundColor: Colors.gray,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CartPage;
