import { useUserType } from "@/context/user-type-context";
import { SplashScreen } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export function SplashScreenController() {
  const { userType, setUserType, isUserTypeLoading } = useUserType();

  if (!isUserTypeLoading && !userType) {
    // Show user type selection screen
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 22, marginBottom: 24 }}>Select your role</Text>
        <Button title="I am a Farmer" onPress={() => setUserType("farmer")} />
        <View style={{ height: 16 }} />
        <Button title="I am a User" onPress={() => setUserType("user")} />
      </View>
    );
  }

  if (!isUserTypeLoading) {
    SplashScreen.hideAsync();
    return null;
  }

  // Show a custom splash screen while loading
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  image: {
    width: 180,
    height: 180,
  },
});
