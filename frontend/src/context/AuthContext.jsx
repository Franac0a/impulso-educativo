import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const data = await userService.getProfile();
      return data.perfil || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const perfil = await checkAuthStatus();
      setUser(perfil);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    await authService.login(email, password);
    const perfil = await checkAuthStatus();
    setUser(perfil);
    return perfil;
  };

  const register = async (userData) => {
    await authService.register(userData);
    return await login(userData.email, userData.password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
