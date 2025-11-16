import React from "react";
import { Routes, Route } from "react-router";

// Componentes de Ruteo
import { PrivateRoutes } from "./router/PrivateRoutes";
import { PublicRoutes } from "./router/PublicRoutes";
import { Navbar } from "./components/Navbar";
// ⚠️ 1. IMPORTAMOS EL FOOTER
import { Footer } from "./components/Footer";

// Páginas
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CareerListPage } from "./pages/CareerListPage";
// ⚠️ 2. IMPORTAMOS LA PÁGINA DE CONTACTO (usando tu archivo)
import { ContactPage } from "./pages/ContactPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MyCareersPage } from "./pages/MyCareersPage";

export const App = () => {
  return (
    <>
      <Navbar />

      {/* El 'pt-20' (padding-top) evita que el contenido
          quede tapado por la Navbar fija */}
      <div className="pt-20">
        <Routes>
          {/* ------------------- */}
          {/* --- RUTAS PÚBLICAS (Para todos) --- */}
          {/* ------------------- */}
          <Route path="/" element={<HomePage />} />
          {/* ⚠️ 3. AÑADIMOS LA RUTA DE CONTACTO */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* ------------------- */}
          {/* --- RUTAS PÚBLICAS (Solo invitados) --- */}
          {/* ------------------- */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ------------------- */}
          {/* --- RUTAS PRIVADAS (Cualquier logueado) --- */}
          {/* ------------------- */}
          {/* Moví /carreras de "estudiante" a aquí,
            basado en tu código anterior. Si solo "estudiante"
            puede verla, movela adentro de esa ruta.
          */}
          <Route element={<PrivateRoutes />}>
            <Route path="/carreras" element={<CareerListPage />} />
          </Route>

          {/* ------------------- */}
          {/* --- RUTAS PRIVADAS (Estudiantes) --- */}
          {/* ------------------- */}
          <Route element={<PrivateRoutes allowedRole="estudiante" />}>
            <Route path="/perfil" element={<h1>Mi Perfil (Estudiante)</h1>} />
            <Route path="/test-vocacional" element={<h1>Test Vocacional</h1>} />
          </Route>

          {/* ------------------- */}
          {/* --- RUTAS PRIVADAS (Universidades) --- */}
          {/* ------------------- */}
          <Route element={<PrivateRoutes allowedRole="universidad" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/mis-carreras" element={<MyCareersPage />} />
            <Route
              path="/dashboard/crear-carrera"
              element={<h1>Admin: Cargar Carrera</h1>}
            />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
        </Routes>
      </div>

      {/* ⚠️ 4. AÑADIMOS EL FOOTER AL FINAL */}
      <Footer />
    </>
  );
};
