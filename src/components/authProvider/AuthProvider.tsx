import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState("guest");
  useEffect(() => {
    const user = localStorage.getItem("userID");
    if (user) {
      const userType = localStorage.getItem("userType");
      if (userType) {
        setUserType(JSON.parse(userType));
      }
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
