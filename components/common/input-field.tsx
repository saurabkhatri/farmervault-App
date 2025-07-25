import { Colors } from "@/constants/Colors";
import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type InputFieldProps = {
  label?: string;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
} & React.ComponentPropsWithRef<typeof RNTextInput>;

const InputField = forwardRef<RNTextInput, InputFieldProps>(
  ({ label, error, touched, isPassword, style, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <View style={{ marginBottom: 16, width: "100%" }}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={{ position: "relative" }}>
          <RNTextInput
            ref={ref}
            style={[
              styles.inputField,
              { width: "100%" },
              style,
              error && touched
                ? { borderColor: "#ff6b6b" }
                : props.value
                ? { borderColor: Colors.primary }
                : {},
            ]}
            secureTextEntry={isPassword && !showPassword}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword((s) => !s)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 18, color: Colors.gray }}>
                {showPassword ? "🙈" : "👁️"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignSelf: "stretch",
    borderRadius: 10,
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: Colors.primary,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 2,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 14,
    padding: 2,
  },
});
