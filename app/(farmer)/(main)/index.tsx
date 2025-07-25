import Header from "@/components/navigation/header";
import ProductListFarmer from "@/components/product-list-farmer";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function FarmerHomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <ProductListFarmer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
    padding: 10,
  },
});
