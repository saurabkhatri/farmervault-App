import { useStorageState } from "@/hooks/useStorageState";
import { createContext, use, type PropsWithChildren } from "react";
import { useUserType } from "./user-type-context";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface UserContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  signIn: (data: { user: User; accessToken: string }) => void;
  signOut: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
  const value = use(UserContext);
  if (!value) throw new Error("useUser must be wrapped in a <UserProvider />");
  return value;
}

export function UserProvider({ children }: PropsWithChildren) {
  // User session/auth state (persisted)
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("user-access-token");
  const [[isUserLoading, user], setUserState] = useStorageState("user-info");
  useUserType();

  const signIn = (data: { user: User; accessToken: string }) => {
    setAccessToken(data.accessToken);
    setUserState(JSON.stringify(data.user));
  };

  const signOut = () => {
    setAccessToken(null);
    setUserState(null);
    // setUserType(null); // Do not clear userType on logout
  };

  const value: UserContextValue = {
    accessToken,
    isLoading: isLoading || isUserLoading,
    user: user ? JSON.parse(user) : null,
    signIn,
    signOut,
    setUser: (info: User | null) =>
      setUserState(info ? JSON.stringify(info) : null),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
