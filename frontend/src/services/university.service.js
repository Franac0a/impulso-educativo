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
    // (Esto también necesitará 'multipart/form-data' si permitís editar el archivo)
    const response = await api.put(`${UNIV_URL}/mi-perfil`, data);
    return response.data;
  },

  // ⚠️ POST /api/universidades (¡ACTUALIZADO!)
  createInstitution: async (formData) => {
    // 'formData' ahora es un objeto FormData
    const response = await api.post(UNIV_URL, formData, {
      // Anulamos el 'Content-Type: application/json'
      // para que Axios lo configure automáticamente a 'multipart/form-data'
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
