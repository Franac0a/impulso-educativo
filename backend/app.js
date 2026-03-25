import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./src/config/database.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { carreraRoutes } from "./src/routes/carrera.routes.js";
import { inscripcionRoutes } from "./src/routes/inscripcion.routes.js";
import { universidadRoutes } from "./src/routes/universidad.routes.js";
import { testResultadoRoutes } from "./src/routes/testResultado.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { universidadesAdmin } from "./src/routes/universidad.admin.routes.js";

dotenv.config();

const app = express();

// config de cors para q pasen las credenciales del front
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// middlewares
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/inscripciones", inscripcionRoutes);
app.use("/api/universidades", universidadRoutes);
app.use("/api/universidadesAdmin", universidadesAdmin);
app.use("/api", testResultadoRoutes);

// sincronizamos la db y levantamos el server
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(" Base de datos sincronizada correctamente.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("🔴 Error al sincronizar la base de datos:", error);
  });
