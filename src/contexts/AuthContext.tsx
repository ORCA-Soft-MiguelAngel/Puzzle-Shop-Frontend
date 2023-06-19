import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

interface DecodedToken {
  username: string;
  userId: string;
}

interface IAuthContext {
  token: string | null;
  decodedToken: DecodedToken | null;
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = Boolean(token);
  const decodedToken: DecodedToken = token
    ? jwtDecode(token)
    : { username: "", userId: "" };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, decodedToken, isAuthenticated, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
