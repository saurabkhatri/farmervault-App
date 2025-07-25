import { FarmerProvider, useFarmer } from "@/context/farmer-context";
import { useUserType } from "@/context/user-type-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

const queryClient = new QueryClient();

export default function FarmerRootLayout() {
  const { userType } = useUserType();
  if (userType !== "farmer") return null;

  return (
    <QueryClientProvider client={queryClient}>
      <FarmerProvider>
        <FarmerLayoutContent />
      </FarmerProvider>
    </QueryClientProvider>
  );
}

function FarmerLayoutContent() {
  const { accessToken } = useFarmer();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
