import { Colors } from "@/constants/Colors";
import { Link, LinkProps } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FooterLinkProps {
  label: string;
  linkText: string;
  href: LinkProps["href"];
  onPress?: () => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  label,
  linkText,
  href,
  onPress,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}{" "}
      <Link href={href} asChild>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.link}>{linkText}</Text>
        </TouchableOpacity>
      </Link>
    </Text>
  </View>
);

export default FooterLink;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    color: Colors.gray,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
