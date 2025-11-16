import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
// ⚠️ Nota: No usaremos userService en esta prueba
// import { userService } from '../services/user.service';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // ⚠️ CAMBIO: Inicia en 'false' para forzar la carga
  const [loading, setLoading] = useState(false);

  /*
  // ⚠️ CAMBIO: Hemos comentado el useEffect que verifica la sesión.
  // Esta es la causa más probable de la pantalla en blanco.
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await userService.getProfile();
        if (response.perfil) {
          setUser(response.perfil);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []); 
  */

  // --- (Las funciones de login/register/logout no cambian) ---

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      return response.user;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.usuario);
      return response.usuario;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    userType: user ? user.type : null,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Ahora '!loading' siempre será 'true' (porque lo seteamos en false)
        y la app SE DEBE mostrar.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
