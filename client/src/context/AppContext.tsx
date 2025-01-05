import { createContext, Dispatch, SetStateAction } from "react";

interface UserData {
  name: string;
  isAccountVerified: boolean;
}

interface AppContextType {
  baseUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  getUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  baseUrl: "", // Provide a default baseUrl or a fallback value
  isLoggedIn: false,
  setIsLoggedIn: () => {}, // Default is a no-op function
  userData: {
    name: "",
    isAccountVerified: false,
  },
  setUserData: () => {}, // Default is a no-op function
  getUserData: async () => {},
});

export default AppContext;

// export const AppContextProvider = ({ children }: { children: ReactNode }) => {
//   const value = {};
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
