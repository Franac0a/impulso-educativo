import { Router } from "express";
import {
  crearCarrera,
  obtenerCarrerasDeUniversidad,
  editarCarrera,
  eliminarCarrera,
  obtenerTodasLasCarrerasPublico,
  obtenerCarreraPorId, // ← detalle público
  obtenerCarrerasPorUniversidad,
} from "../controllers/carrera.controller.js";

import {
  verificarUsuario,
  soloUniversidad,
} from "../middlewares/auth.middleware.js";

export const carreraRoutes = Router();

/* -----------------------------------------
   RUTAS PÚBLICAS
----------------------------------------- */

// GET /api/carreras
// Ej: ?area=Tecnología&tipo=Grado
carreraRoutes.get("/", obtenerTodasLasCarrerasPublico);

// GET /api/carreras/universidad/:id
// Devuelve las carreras relacionadas con la universidad indicada
carreraRoutes.get("/universidad/:id", obtenerCarrerasPorUniversidad);

// Nota: la ruta "/:id" se define más abajo, después de las rutas privadas,
// para evitar que URLs como '/mis-carreras-user' sean interpretadas como 'id'.

/* -----------------------------------------
   RUTAS PRIVADAS (solo universidades)
----------------------------------------- */

// GET /api/carreras/mis-carreras
carreraRoutes.get(
  "/mis-carreras-user",
  verificarUsuario,
  soloUniversidad,
  obtenerCarrerasDeUniversidad
);

// POST /api/carreras
carreraRoutes.post("/", verificarUsuario, soloUniversidad, crearCarrera);

// PUT /api/carreras/:id
carreraRoutes.put("/:id", verificarUsuario, soloUniversidad, editarCarrera);

// DELETE /api/carreras/:id
carreraRoutes.delete(
  "/:id",
  verificarUsuario,
  soloUniversidad,
  eliminarCarrera
);

// GET /api/carreras/:id
// Detalle público de una carrera (se coloca al final para evitar colisiones)
carreraRoutes.get("/:id", obtenerCarreraPorId);
