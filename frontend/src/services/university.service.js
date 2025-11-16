// src/services/university.service.js
// ⚠️ ¡ESTA ES LA LÍNEA CORREGIDA!
import { api } from "./api";

const UNIV_URL = "/universidades";

export const universityService = {
  // GET /api/universidades?search=...
  getAllPublic: async (filters = {}) => {
    const response = await api.get(UNIV_URL, { params: filters });
    return response.data;
  },

  // GET /api/universidades/mi-perfil
  getMyInstitution: async () => {
    const response = await api.get(`${UNIV_URL}/mi-perfil`);
    return response.data;
  },

  // PUT /api/universidades/mi-perfil
  updateMyInstitution: async (data) => {
    const response = await api.put(`${UNIV_URL}/mi-perfil`, data);
    return response.data;
  },

  // POST /api/universidades
  createInstitution: async (data) => {
    const response = await api.post(UNIV_URL, data);
    return response.data;
  },
};
