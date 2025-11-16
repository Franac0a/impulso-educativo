// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Importaciones de Páginas
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CareerListPage } from "./pages/CareerListPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MyCareersPage } from "./pages/MyCareersPage";

// ⚠️ ¡NUEVA IMPORTACIÓN!
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <>
      {" "}
      {/* Fragment para envolver la Navbar y las Rutas */}
      <Navbar />
      {/* Este div añade un padding superior para que el contenido no quede debajo de la Navbar fija */}
      <div className="pt-20">
        {" "}
        {/* Ajusta 'pt-20' (padding-top: 5rem) según la altura de tu Navbar */}
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/carreras" element={<CareerListPage />} />

          {/* Rutas Protegidas (Estudiante/Cualquiera logueado) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<h1>Mi Perfil (Estudiante)</h1>} />
            <Route path="/test-vocacional" element={<h1>Test Vocacional</h1>} />
          </Route>

          {/* Rutas de Rol "universidad" */}
          <Route element={<ProtectedRoute allowedRole="universidad" />}>
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
    </>
  );
};
