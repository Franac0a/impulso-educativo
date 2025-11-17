import { Router } from "express";
import {
  crearUniversidad,
  obtenerMisCarreras,
  obtenerTodasLasUniversidadesPublico,
  obtenerMiInstitucion,
  actualizarMiInstitucion,
} from "../controllers/universidad.controller.js";
import {
  verificarUsuario,
  soloUniversidad,
} from "../middlewares/auth.middleware.js";
// ⚠️ 1. IMPORTAR MULTER
import { uploadDocumento } from "../config/multer.js";

export const universidadRoutes = Router();

// --- RUTA PÚBLICA ---
universidadRoutes.get("/", obtenerTodasLasUniversidadesPublico);

// --- RUTAS PROTEGIDAS (ADMIN) ---

// POST /api/universidades
// ⚠️ 2. USAMOS MULTER ANTES DEL CONTROLADOR
universidadRoutes.post(
  "/",
  verificarUsuario,
  soloUniversidad,
  // El nombre del campo debe coincidir con el del frontend (documento_verificacion)
  uploadDocumento.single("documento_verificacion"),
  crearUniversidad
);

// ... (resto de rutas)
