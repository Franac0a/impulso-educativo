// src/services/test.service.js
// ⚠️ ¡ESTA ES LA LÍNEA CORREGIDA!
import { api } from "./api";

export const testService = {
  // POST /api/save-mbti-result
  saveMbti: async (mbtiResult) => {
    const response = await api.post("/save-mbti-result", { mbtiResult });
    return response.data;
  },
};
