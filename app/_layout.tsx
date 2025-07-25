import { UserTypeProvider, useUserType } from "@/context/user-type-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserTypeProvider>
        <RootNavigator />
      </UserTypeProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { userType } = useUserType();

  if (!userType) {
    // Show only the select-role screen
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="select-role" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // Show the appropriate stack based on userType
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={userType === "user" ? "(user)" : "(farmer)"}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
