import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("accessToken")
      ? jwtDecode(JSON.parse(localStorage.getItem("accessToken")))
      : null;
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
