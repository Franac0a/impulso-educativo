import { Router } from "express";
import {
  crearUniversidad,
  obtenerMisCarreras,
  obtenerTodasLasUniversidadesPublico,
  obtenerMiInstitucion, // Controlador para /mi-perfil
  actualizarMiInstitucion,
} from "../controllers/universidad.controller.js";
import {
  verificarUsuario,
  soloUniversidad,
} from "../middlewares/auth.middleware.js";
import { uploadDocumento } from "../config/multer.js";

export const universidadRoutes = Router();

// --- RUTA PÚBLICA ---
// GET /api/universidades
universidadRoutes.get("/", obtenerTodasLasUniversidadesPublico);

// --- RUTAS PROTEGIDAS (DASHBOARD) ---

// 1. OBTENER MI INSTITUCIÓN
// GET /api/universidades/mi-perfil
// ⚠️ ESTA ES LA RUTA QUE FALTABA O ESTABA MAL ESCRITA
universidadRoutes.get(
  "/mi-perfil",
  verificarUsuario,
  soloUniversidad,
  obtenerMiInstitucion // Usa el controlador que busca la institución por userId
);

// 2. CREAR INSTITUCIÓN (POST con archivo)
// POST /api/universidades/
universidadRoutes.post(
  "/",
  verificarUsuario,
  soloUniversidad,
  // Middleware de Multer para manejar la subida del documento
  uploadDocumento.single("documento_verificacion"),
  crearUniversidad
);

// 3. ACTUALIZAR INSTITUCIÓN (PUT)
// PUT /api/universidades/
universidadRoutes.put(
  "/",
  verificarUsuario,
  soloUniversidad,
  actualizarMiInstitucion
);

// 4. OBTENER MIS CARRERAS
// GET /api/universidades/mis-carreras
universidadRoutes.get(
  "/mis-carreras",
  verificarUsuario,
  soloUniversidad,
  obtenerMisCarreras
);
