import React from "react";
import { Routes, Route } from "react-router";

// Componentes de Ruteo
import { PrivateRoutes } from "./router/PrivateRoutes";
import { PublicRoutes } from "./router/PublicRoutes";

// Componentes UI
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { VerificationBanner } from "./components/VerificationBanner";

// Páginas
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CareerListPage } from "./pages/CareerListPage";
import { ContactPage } from "./pages/ContactPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MyCareersPage } from "./pages/MyCareersPage";
import { CreateCareerPage } from "./pages/CreateCareerPage";
import { CreateInstitutionPage } from "./pages/CreateInstitutionPage";
// ⚠️ NUEVA IMPORTACIÓN
import { EditInstitutionPage } from "./pages/EditInstitutionPage";

export const App = () => {
  return (
    <>
      <Navbar />
      <VerificationBanner />

      <div className="pt-32">
        <Routes>
          {/* --- RUTAS PÚBLICAS (Para todos) --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />

          {/* --- RUTAS PÚBLICAS (Solo invitados) --- */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* --- RUTAS PRIVADAS (Cualquier logueado) --- */}
          <Route element={<PrivateRoutes />}>
            <Route path="/carreras" element={<CareerListPage />} />
          </Route>

          {/* --- RUTAS PRIVADAS (Estudiantes) --- */}
          <Route element={<PrivateRoutes allowedRole="estudiante" />}>
            <Route path="/perfil" element={<h1>Mi Perfil (Estudiante)</h1>} />
            <Route path="/test-vocacional" element={<h1>Test Vocacional</h1>} />
          </Route>

          {/* --- RUTAS PRIVADAS (Universidades) --- */}
          <Route element={<PrivateRoutes allowedRole="universidad" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/mis-carreras" element={<MyCareersPage />} />
            <Route
              path="/dashboard/crear-carrera"
              element={<CreateCareerPage />}
            />
            <Route
              path="/dashboard/crear-perfil"
              element={<CreateInstitutionPage />}
            />
            {/* ⚠️ RUTA ACTUALIZADA */}
            <Route
              path="/dashboard/editar-perfil"
              element={<EditInstitutionPage />}
            />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};
