import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  emailHref: Href;
};

const SocialLoginButton = (props: Props) => {
  const { emailHref } = props;

  return (
    <View style={styles.socialWrapper}>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text>Go to SignUp Screen</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(1000).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  socialWrapper: {
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 15,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
});
