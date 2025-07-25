import { useStorageState } from "@/hooks/useStorageState";
import { createContext, use, type PropsWithChildren } from "react";

const UserTypeContext = createContext<{
  userType?: string | null;
  setUserType: (type: string | null) => void;
  isUserTypeLoading: boolean;
}>({
  userType: null,
  setUserType: () => null,
  isUserTypeLoading: false,
});

export function useUserType() {
  const value = use(UserTypeContext);
  if (!value) {
    throw new Error("useUserType must be wrapped in a <UserTypeProvider />");
  }
  return value;
}

export function UserTypeProvider({ children }: PropsWithChildren) {
  const [[isUserTypeLoading, userType], setUserType] =
    useStorageState("userType");
  return (
    <UserTypeContext.Provider
      value={{ userType, setUserType, isUserTypeLoading }}
    >
      {children}
    </UserTypeContext.Provider>
  );
}
