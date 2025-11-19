import { api } from "./api";

const USERS_URL = "/users";

export const userService = {
  getProfile: async () => {
    const response = await api.get(`${USERS_URL}/perfil`, {
      withCredentials: true,
    });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get(USERS_URL, { withCredentials: true });
    return response.data;
  },
};

export const saveVocationalResult = async (riasecProfile) => {
  if (!riasecProfile || riasecProfile.length !== 3) {
    throw new Error("Formato de perfil RIASEC inválido.");
  }

  const response = await api.post(
    `${USERS_URL}/save-vocational-result`,
    { riasec: riasecProfile },
    { withCredentials: true }
  );

  return response.data;
};

export const resetVocationalResult = async () => {
  const response = await api.post(
    `${USERS_URL}/reset-vocational-result`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
