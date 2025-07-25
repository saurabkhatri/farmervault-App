import { useFarmer } from "@/context/farmer-context";
import { router } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function FarmerProfileScreen() {
  const { farmer, signOut } = useFarmer();
  const handleLogout = () => {
    signOut();
    router.replace("/(farmer)/auth/sign-in");
  };

  console.log(farmer);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>
      <Image
        source={{
          uri:
            farmer?.avatar ??
            "https://randomuser.me/api/portraits/women/44.jpg",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{farmer?.name}</Text>
      <Text style={styles.info}>{farmer?.email}</Text>
      <Text style={styles.info}>{farmer?.phone}</Text>
      <Button title="Logout" onPress={handleLogout} color="#2575fc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f9fa",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2575fc",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 18,
    borderWidth: 2,
    borderColor: "#2575fc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2575fc",
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginBottom: 2,
  },
});
