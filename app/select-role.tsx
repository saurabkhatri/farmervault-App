import { useUserType } from "@/context/user-type-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SelectRoleScreen() {
  const { setUserType } = useUserType();

  const handleSelect = (type: "user" | "farmer") => {
    setUserType(type);
    router.replace(type === "user" ? "/(user)/(main)" : "/(farmer)/(main)");
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Select Your Role</Text> */}
        <View style={styles.spacer} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelect("user")}
          >
            <Ionicons
              name="person-outline"
              size={32}
              color="#2575fc"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Continue as User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelect("farmer")}
          >
            <Ionicons
              name="leaf-outline"
              size={32}
              color="#2575fc"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Continue as Farmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "transparent",
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 16,
    color: "#2575fc",
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2575fc",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 18,
    width: "85%",
    shadowColor: "#2575fc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  buttonText: {
    color: "#2575fc",
    fontSize: 18,
    fontWeight: "bold",
  },
});
