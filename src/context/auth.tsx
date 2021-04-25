import { createContext, ReactNode, useContext } from "react";
import useAuthProvider from "@/hooks/use-auth-prodiver";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props: { children: ReactNode }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth} {...props} />;
};

export default AuthProvider;
