// src/services/api.js
import axios from "axios";

const VITE_BACKEND_URL = "http://localhost:3000/api";

// ⚠️ CAMBIO: Exportamos como una constante nombrada
export const api = axios.create({
  baseURL: VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// No hay export default
