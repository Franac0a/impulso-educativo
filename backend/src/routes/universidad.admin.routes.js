import { Router } from "express";

// --- Importamos los controladores de universidad ---
import {
  crearUniversidad,
  obtenerMiInstitucion,
  obtenerMisCarreras,
} from "../controllers/universidad.controller.js";

// --- Importamos los middlewares ---
import {
  verificarUsuario,
  soloUniversidad,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

export const universidadesAdmin = Router();

// --- RUTAS PROTEGIDAS (Solo para Universidades) ---

// POST /api/universidades
// Para que un usuario "universidad" cree su perfil
universidadesAdmin.post(
  "/crear-universidad",
  [verificarUsuario, soloUniversidad],
  upload.single("documento_verificacion"), // ⚠️ el nombre debe coincidir con FormData
  crearUniversidad
);

// GET /api/universidades/mis-carreras
// Para que la U. vea las carreras que ha cargado
universidadesAdmin.get(
  "/mis-carreras-admin",
  [verificarUsuario, soloUniversidad],
  obtenerMisCarreras
);

universidadesAdmin.get(
  "/mi-perfil-admin",
  verificarUsuario,
  soloUniversidad,
  obtenerMiInstitucion
);

export default universidadesAdmin;
