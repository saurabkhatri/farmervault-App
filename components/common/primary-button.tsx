import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    disabled={disabled || loading}
    style={[styles.button, disabled ? styles.disabled : {}, style]}
  >
    {loading ? (
      <ActivityIndicator color={Colors.white} />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
