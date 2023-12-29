"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let initialAuthState = false;

  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("authed") || "false";
    initialAuthState = JSON.parse(storedAuth);
  }

  const [isAuth, setIsAuth] = useState(initialAuthState);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  const contextValues: AuthContextType = {
    isAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };
