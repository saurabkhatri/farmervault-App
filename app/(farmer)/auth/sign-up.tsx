import FooterLink from "@/components/common/footer-link";
import InputField from "@/components/common/input-field";
import PrimaryButton from "@/components/common/primary-button";
import TitleSection from "@/components/common/title-section";
import { useFarmer } from "@/context/farmer-context";
import { useUserType } from "@/context/user-type-context";
import { farmerSignUp } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().length(10, "Phone number should be 10 digits"),
    address: z.string().min(2, "Address is required"),
    gender: z.enum(["male", "female", "other"]),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    termsnCondition: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function FarmerSignUp() {
  const { signIn } = useFarmer();
  const { setUserType } = useUserType();
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      gender: "male",
      termsnCondition: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpForm) =>
      farmerSignUp(
        data.fullName,
        data.email,
        data.phone,
        data.gender,
        data.address,
        data.password,
        data.termsnCondition
      ),
    onSuccess: (data) => {
      signIn({ farmer: data.user, accessToken: data.accessToken });
      router.replace("/(farmer)/auth/sign-in");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? "Something went wrong";
      Alert.alert("Error", message);
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    mutation.mutate(data);
  };

  return (
    <LinearGradient
      colors={["#f8fafc", "#e0f2fe"]}
      style={{ flex: 1 }}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TitleSection
            title="Farmer Sign Up"
            description="Create your farmer account to get started"
          />
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={nameRef}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                error={errors.fullName?.message}
                touched={touchedFields.fullName}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={emailRef}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current?.focus()}
                error={errors.email?.message}
                touched={touchedFields.email}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Phone Number"
                placeholder="Enter your phone number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={phoneRef}
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => addressRef.current?.focus()}
                error={errors.phone?.message}
                touched={touchedFields.phone}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Address"
                placeholder="Enter your address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={addressRef}
                returnKeyType="next"
                error={errors.address?.message}
                touched={touchedFields.address}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                  Gender
                </Text>
                <View style={{ flexDirection: "row", gap: 16 }}>
                  {(["male", "female", "other"] as const).map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={{
                        padding: 8,
                        borderWidth: 1,
                        borderColor: value === g ? "#2575fc" : "#ccc",
                        borderRadius: 6,
                        marginRight: 8,
                        backgroundColor: value === g ? "#e2eafc" : "#fff",
                      }}
                      onPress={() => onChange(g)}
                    >
                      <Text style={{ color: value === g ? "#2575fc" : "#333" }}>
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.gender && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {errors.gender.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={passwordRef}
                isPassword={true}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                error={errors.password?.message}
                touched={touchedFields.password}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={confirmPasswordRef}
                isPassword={true}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                error={
                  errors.confirmPassword?.message ||
                  (errors.confirmPassword && "Passwords don't match")
                }
                touched={touchedFields.confirmPassword}
              />
            )}
          />
          <Controller
            control={control}
            name="termsnCondition"
            render={({ field: { value, onChange } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Switch value={value} onValueChange={onChange} />
                <Text style={{ marginLeft: 8 }}>
                  I accept the terms and conditions
                </Text>
                {errors.termsnCondition && (
                  <Text style={{ color: "red", fontSize: 12, marginLeft: 8 }}>
                    {errors.termsnCondition.message}
                  </Text>
                )}
              </View>
            )}
          />
          <PrimaryButton
            title={
              mutation.isPending ? "Creating Account..." : "Create Account"
            }
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          />
          <FooterLink
            label="Already have a farmer account?"
            linkText="Sign In"
            href="/(farmer)/auth/sign-in"
          />
          <FooterLink
            label="Want to choose a different role?"
            linkText="Select Role"
            href="/select-role"
            onPress={() => setUserType(null)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
