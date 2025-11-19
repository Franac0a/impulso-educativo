import { Router } from "express";
import {
  crearCarrera,
  obtenerCarrerasDeUniversidad,
  editarCarrera,
  eliminarCarrera,
  obtenerTodasLasCarrerasPublico,
  obtenerCarreraPorId, // ← detalle público
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

// GET /api/carreras/:id
// Detalle público de una carrera
carreraRoutes.get("/:id", obtenerCarreraPorId);

/* -----------------------------------------
   RUTAS PRIVADAS (solo universidades)
----------------------------------------- */

// GET /api/carreras/mis-carreras
carreraRoutes.get(
  "/mis-carreras",
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
