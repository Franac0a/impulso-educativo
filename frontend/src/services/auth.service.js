import { api } from "./api";

const AUTH_URL = "/auth";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Error en el login.");
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(`${AUTH_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Error en el registro.");
    }
  },

  logout: async () => {
    try {
      await api.post(`${AUTH_URL}/logout`);
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return false;
    }
  },
};
