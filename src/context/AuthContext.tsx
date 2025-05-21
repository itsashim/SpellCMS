/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, type ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:AuthProviderProps) {
      const [curToken, setCurToken] = useState<string>(() => {
        return localStorage.getItem("auth-token") || "";
    });

    const isAuthenticated = curToken ? true : false;

    const login = (token:string)=>{
        localStorage.setItem("auth-token",token);
        setCurToken(token);
    }
    const logout = () =>{
        localStorage.removeItem("auth-token");
        setCurToken("");
    }

  return (
    <AuthContext.Provider value={{isAuthenticated,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

// Auth Hook 
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
