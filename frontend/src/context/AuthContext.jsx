import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// ⚠️ Esta es la función que verifica la sesión (la usaremos en el login)
const checkAuthStatus = async () => {
  try {
    const response = await userService.getProfile();
    if (response.perfil) {
      return response.perfil; // Devuelve el perfil completo
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Al cargar la app, verificamos la sesión
    const loadUser = async () => {
      const userProfile = await checkAuthStatus();
      setUser(userProfile);
      setLoading(false);
    };
    loadUser();
  }, []);

  // --- ⚠️ ¡AQUÍ ESTÁ EL ARREGLO! ---

  const login = async (email, password) => {
    try {
      // 1. Llama a la API de login (esto setea la cookie)
      await authService.login(email, password);

      // 2. Ahora que la cookie existe, obtenemos el perfil completo
      const userProfile = await checkAuthStatus();

      // 3. ¡Seteamos el usuario COMPLETO (con .name)!
      setUser(userProfile);
      return userProfile;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // 1. Llama a la API de registro
      await authService.register(userData);

      // 2. Llama a NUESTRA función de login (la de arriba)
      // que se encarga de setear la cookie y el perfil
      return await login(userData.email, userData.password);
    } catch (error) {
      throw error;
    }
  };

  // ------------------------------------

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register, // 👈 Usaremos esta en el formulario
    logout,
    isAuthenticated: !!user,
    userType: user ? user.type : null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
