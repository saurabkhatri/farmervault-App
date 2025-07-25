import { getOrdersBySeller } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const OrdersPage = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersBySeller,
  });

  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>OrdersPage</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>OrdersPage</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>OrdersPage</Text>
      </View>
    </SafeAreaView>
  );
};

export default OrdersPage;
