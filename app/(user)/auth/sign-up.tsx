import FooterLink from "@/components/common/footer-link";
import InputField from "@/components/common/input-field";
import PrimaryButton from "@/components/common/primary-button";
import TitleSection from "@/components/common/title-section";
import { useUserType } from "@/context/user-type-context";
import { userSignUp } from "@/services/api";
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
  TextInput,
} from "react-native";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(1, "Name is required")
      .min(2, "Name should be at least 2 characters"),
    phone: z
      .string("Phone number is required")
      .length(10, "Phone number should be at least 10 digits"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string("Password is required")
      .min(1, "Password is required")
      .min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function UserSignUp() {
  const { setUserType } = useUserType();
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpForm) =>
      userSignUp(data.name, data.email, data.password),
    onSuccess: (data) => {
      console.log(data);

      router.replace("/(user)/auth/sign-in");
    },
    onError: (error) => {
      console.log(error);
      const message =
        (error as any)?.response?.data?.message ?? "Something went wrong";
      Alert.alert("Error", message);
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);
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
            title="User Sign Up"
            description="Create your user account to get started"
          />
          <Controller
            control={control}
            name="name"
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
                error={errors.name?.message}
                touched={touchedFields.name}
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
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={errors.phone?.message}
                touched={touchedFields.phone}
              />
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
          <PrimaryButton
            title={
              mutation.isPending ? "Creating Account..." : "Create Account"
            }
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          />
          <FooterLink
            label="Already have a user account?"
            linkText="Sign In"
            href="/(user)/auth/sign-in"
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
