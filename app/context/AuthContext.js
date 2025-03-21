"use client";
import Cookies from "js-cookie";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setUserRole(null);
      setLoading(false);
      return;
    }
    const role = localStorage.getItem("user_role");
    setUserRole(role);
    setIsAuthenticated(true);
    setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        token,
        userRole,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
