import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * Rutas públicas que NO deben ser accesibles si el usuario ya está logueado.
 * (Ej: /login, /register)
 * Si está logueado, redirige a la Home.
 */
export const PublicRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Muestra un 'cargando' mientras verifica la sesión
    // (Puedes reemplazarlo por un componente spinner)
    return <div>Cargando...</div>;
  }

  // Si está autenticado, no debe ver Login/Register, lo mandamos a la Home.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si no está autenticado, muestra la página (Login, Register).
  return <Outlet />;
};
