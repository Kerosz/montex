// packages
import { createContext, ReactNode, useContext } from "react";
// helpers
import { isUndefined } from "@helpers/assertions";
// hooks
import useAuthProvider from "@/hooks/use-auth-provider";

const defaultValue = ({} as unknown) as ReturnType<typeof useAuthProvider>;

const AuthContext = createContext<ReturnType<typeof useAuthProvider>>(
  defaultValue
);

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (isUndefined(ctx)) {
    throw new Error(`'useAuth' must be used within a 'AuthProvider'`);
  }

  return ctx;
};

const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth} {...props} />;
};

export default AuthProvider;
