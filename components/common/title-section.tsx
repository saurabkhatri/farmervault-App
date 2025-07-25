import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TitleSectionProps {
  title: string;
  description?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, description }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

export default TitleSection;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 8,
    textAlign: "center",
  },
});
