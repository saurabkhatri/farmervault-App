import { UserProvider, useUser } from "@/context/user-context";
import { useUserType } from "@/context/user-type-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

const queryClient = new QueryClient();

export default function UserRootLayout() {
  const { userType } = useUserType();
  if (userType !== "user") return null;
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserLayoutContent />
      </UserProvider>
    </QueryClientProvider>
  );
}

function UserLayoutContent() {
  const { accessToken } = useUser();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[productId]" options={{}} />
      </Stack.Protected>
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
