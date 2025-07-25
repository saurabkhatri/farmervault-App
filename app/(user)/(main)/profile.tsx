import { useUser } from "@/context/user-context";
import { router } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, signOut } = useUser();
  const handleLogout = () => {
    signOut();
    router.replace("/(user)/auth/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={{
          uri:
            user?.avatar ?? "https://randomuser.me/api/portraits/women/44.jpg",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.info}>{user?.email}</Text>
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
