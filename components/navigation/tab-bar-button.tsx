import { Colors } from "@/constants/Colors";
import { icons } from "@/constants/icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconKeys = keyof typeof icons;

type Props = {
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  isFocused: boolean;
  routeName: IconKeys;
};
const TabBarButton = (props: Props) => {
  const { onPress, onLongPress, label, isFocused, routeName } = props;

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.btn}>
      {routeName === "cart" && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      )}
      {icons[routeName]({
        color: isFocused ? Colors.primary : Colors.black,
      })}
      <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  badgeWrapper: {
    position: "absolute",
    backgroundColor: Colors.highlight,
    top: -5,
    right: 20,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    zIndex: 10,
  },
  badgeText: {
    color: Colors.black,
    fontSize: 12,
  },
});
