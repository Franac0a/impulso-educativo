// src/services/careers.service.js
// ⚠️ ¡ESTA ES LA LÍNEA CORREGIDA!
import { api } from "./api";

const CAREERS_URL = "/carreras";

export const careersService = {
  // GET /api/carreras?search=...
  getAllPublic: async (filters = {}) => {
    const response = await api.get(CAREERS_URL, { params: filters });
    return response.data;
  },

  // GET /api/carreras/mis-carreras
  getMyCareers: async () => {
    const response = await api.get(`${CAREERS_URL}/mis-carreras`);
    return response.data;
  },

  // POST /api/carreras
  create: async (careerData) => {
    const response = await api.post(CAREERS_URL, careerData);
    return response.data;
  },
};
