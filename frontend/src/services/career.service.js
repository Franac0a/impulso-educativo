import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const careerApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const careerService = {
  /**
   * Obtiene todas las carreras públicas (con filtros).
   */
  getAllPublic: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await careerApi.get(`/carreras?${params}`);
    return response.data;
  },

  /**
   * Obtiene las carreras de la institución logueada.
   */
  getMyCareers: async () => {
    const response = await careerApi.get("/carreras/mis-carreras");
    return response.data;
  },

  /**
   * Crea una nueva carrera.
   */
  create: async (careerData) => {
    const response = await careerApi.post("/carreras", careerData);
    return response.data;
  },

  /**
   * Obtiene una carrera por su ID (Público).
   */
  getById: async (id) => {
    const response = await careerApi.get(`/carreras/${id}`);
    return response.data;
  },
};
