"use client";

import { createContext, useEffect, useState, useCallback } from "react";

export interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  userType: string;
  setUserType: (type: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: string | null;
}) => {
  const [user, setUser] = useState<string | null>(initialUser);
  const [userType, setUserType] = useState<string>("guest");

  useEffect(() => {
    if (initialUser) {
      const storedUserType = localStorage.getItem("userType");
      if (storedUserType) {
        setUserType(JSON.parse(storedUserType));
      }
    }
  }, [initialUser]);

  const updateUser = useCallback((newUser: string | null) => {
    setUser(newUser);
  }, []);

  const updateUserType = useCallback((newType: string) => {
    setUserType(newType);
    localStorage.setItem("userType", JSON.stringify(newType));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        userType,
        setUserType: updateUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
