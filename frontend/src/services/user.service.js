// src/services/user.service.js
// ⚠️ ¡ESTA ES LA LÍNEA CORREGIDA!
import { api } from "./api";

const USER_URL = "/users";

export const userService = {
  // GET /api/users/perfil
  getProfile: async () => {
    const response = await api.get(`${USER_URL}/perfil`);
    return response.data;
  },

  // POST /api/users/save-vocational-result
  saveVocationalResult: async (riasecProfile) => {
    const response = await api.post(`${USER_URL}/save-vocational-result`, {
      riasecProfile,
    });
    return response.data;
  },
};
