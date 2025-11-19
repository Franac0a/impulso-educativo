import { Router } from "express";
import {
  crearUniversidad,
  obtenerMisCarreras,
  obtenerTodasLasUniversidadesPublico,
  obtenerMiInstitucion,
  actualizarMiInstitucion,
  obtenerUniversidadPorId, // ✅ NUEVO CONTROLADOR
} from "../controllers/universidad.controller.js";
import {
  verificarUsuario,
  soloUniversidad,
} from "../middlewares/auth.middleware.js";
import { uploadDocumento } from "../config/multer.js";

export const universidadRoutes = Router();

// --- RUTAS PÚBLICAS ---

// GET /api/universidades → todas las universidades públicas
universidadRoutes.get("/", obtenerTodasLasUniversidadesPublico);

// GET /api/universidades/:id → universidad pública por ID con sus carreras
universidadRoutes.get("/:id", obtenerUniversidadPorId);

// --- RUTAS PROTEGIDAS (DASHBOARD) ---

// 1. OBTENER MI INSTITUCIÓN
// GET /api/universidades/mi-perfil
universidadRoutes.get(
  "/mi-perfil",
  verificarUsuario,
  soloUniversidad,
  obtenerMiInstitucion
);

// 2. CREAR INSTITUCIÓN (POST con archivo)
universidadRoutes.post(
  "/",
  verificarUsuario,
  soloUniversidad,
  uploadDocumento.single("documento_verificacion"),
  crearUniversidad
);

// 3. ACTUALIZAR INSTITUCIÓN (PUT)
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
