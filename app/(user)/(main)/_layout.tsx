import { CartProvider } from "@/context/cart-context";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <CartProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarBadge: 3,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
