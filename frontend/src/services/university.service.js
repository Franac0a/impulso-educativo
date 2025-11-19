import { api } from "./api";

const UNIV_URL = "/universidades";

export const universityService = {
  /**
   * Obtener todas las universidades públicas (con filtro opcional)
   * GET /api/universidades?search=...
   */
  getAllPublic: async (filters = {}) => {
    const response = await api.get(UNIV_URL, { params: filters });
    return response.data;
  },

  /**
   * Obtener universidad por ID (perfil público)
   * GET /api/universidades/:id
   */
  getById: async (id) => {
    const response = await api.get(`${UNIV_URL}/${id}`);
    return response.data;
  },

  /**
   * Obtener mi institución (usuario logueado)
   * GET /api/universidades/mi-perfil
   */
  getMyInstitution: async () => {
    const response = await api.get(`${UNIV_URL}/mi-perfil`);
    return response.data;
  },

  /**
   * Actualizar mi institución (usuario logueado)
   * PUT /api/universidades/mi-perfil
   */
  updateMyInstitution: async (data) => {
    const response = await api.put(`${UNIV_URL}/mi-perfil`, data);
    return response.data;
  },

  /**
   * Crear nueva institución (usuario logueado)
   * POST /api/universidades
   * 'formData' debe ser un FormData si incluye archivos
   */
  createInstitution: async (formData) => {
    const response = await api.post(UNIV_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /**
   * Obtener mis carreras (usuario logueado)
   * GET /api/universidades/mis-carreras
   */
  getMyCareers: async () => {
    const response = await api.get(`${UNIV_URL}/mis-carreras`);
    return response.data;
  },
};
