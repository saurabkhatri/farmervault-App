import { useStorageState } from "@/hooks/useStorageState";
import { createContext, use, type PropsWithChildren } from "react";
import { useUserType } from "./user-type-context";

export interface Farmer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
  avatar: string | null;
}

export interface FarmerContextValue {
  farmer: Farmer | null;
  accessToken: string | null;
  isLoading: boolean;
  signIn: (data: { farmer: Farmer; accessToken: string }) => void;
  signOut: () => void;
  setFarmer: (farmer: Farmer | null) => void;
}

const FarmerContext = createContext<FarmerContextValue | null>(null);

export function useFarmer() {
  const value = use(FarmerContext);
  if (!value)
    throw new Error("useFarmer must be wrapped in a <FarmerProvider />");
  return value;
}

export function FarmerProvider({ children }: PropsWithChildren) {
  // Farmer session/auth state (persisted)
  const [[isLoading, accessToken], setAccessToken] = useStorageState(
    "farmer-access-token"
  );
  const [[isFarmerLoading, farmer], setFarmerState] =
    useStorageState("farmer-info");
  useUserType();

  const signIn = (data: { farmer: Farmer; accessToken: string }) => {
    setAccessToken(data.accessToken);
    setFarmerState(JSON.stringify(data.farmer));
  };

  const signOut = () => {
    setAccessToken(null);
    setFarmerState(null);
    // setUserType(null); // Do not clear userType on logout
  };

  const value: FarmerContextValue = {
    accessToken,
    isLoading: isLoading || isFarmerLoading,
    farmer: farmer ? JSON.parse(farmer) : null,
    signIn,
    signOut,
    setFarmer: (info: Farmer | null) =>
      setFarmerState(info ? JSON.stringify(info) : null),
  };

  return (
    <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>
  );
}
