import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const checkAuthStatus = async () => {
  try {
    const response = await userService.getProfile();
    return response.perfil || null;
  } catch (error) {
    console.error("Error en checkAuthStatus:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const perfil = await checkAuthStatus();
      setUser(perfil);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      const perfil = await checkAuthStatus();
      setUser(perfil);
      return perfil;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return await login(userData.email, userData.password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const saveVocationalResult = async (riasecProfile) => {
    try {
      const response = await userService.saveVocationalResult(riasecProfile);

      setUser((prev) => ({ ...prev, riasecProfile: response.riasecProfile }));
      return response;
    } catch (error) {
      console.error("Error guardando el resultado vocacional:", error);
      throw error;
    }
  };

  const resetVocationalResult = async () => {
    try {
      const response = await userService.saveVocationalResult(null); // reinicio en el campo
      setUser((prev) => ({ ...prev, riasecProfile: null }));
      return response;
    } catch (error) {
      console.error("Error reiniciando el resultado vocacional:", error);
      throw error;
    }
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
        userType: user?.type || null,
        saveVocationalResult,
        resetVocationalResult,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
