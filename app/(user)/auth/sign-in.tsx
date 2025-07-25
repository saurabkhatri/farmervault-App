import FooterLink from "@/components/common/footer-link";
import InputField from "@/components/common/input-field";
import PrimaryButton from "@/components/common/primary-button";
import TitleSection from "@/components/common/title-section";
import { useUser } from "@/context/user-context";
import { useUserType } from "@/context/user-type-context";
import { userSignIn } from "@/services/api";
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

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(6, "Password should be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function UserSignIn() {
  const { signIn } = useUser();
  const { setUserType } = useUserType();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (data: SignInForm) => userSignIn(data.email, data.password),
    onSuccess: (data) => {
      signIn({ user: data.user, accessToken: data.accessToken });
      router.replace("/(user)/(main)");
      console.log("first");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? "Something went wrong";
      Alert.alert("Error", message);
    },
  });

  const onSubmit = async (data: SignInForm) => {
    mutation.mutate(data);
  };

  return (
    <LinearGradient
      colors={["#f7f9fa", "#e2eafc"]}
      style={{ flex: 1 }}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={40}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TitleSection
            title="User Sign In"
            description="Sign in to continue to your user account"
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email Address"
                placeholder="Email address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                error={errors.email?.message}
                touched={touchedFields.email}
                onSubmitEditing={() => passwordRef.current?.focus()}
                ref={emailRef}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                isPassword={true}
                returnKeyType="done"
                error={errors.password?.message}
                touched={touchedFields.password}
                ref={passwordRef}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          <PrimaryButton
            title={mutation.isPending ? "Signing In..." : "Sign In"}
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          />
          <FooterLink
            label="Don't have a user account?"
            linkText="Sign Up"
            href="/(user)/auth/sign-up"
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
