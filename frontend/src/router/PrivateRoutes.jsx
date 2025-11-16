// src/components/PrivateRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * Rutas que SÓLO deben ser accesibles si el usuario está logueado.
 * Si no está logueado, redirige a /login.
 * Opcional: Si se pasa 'allowedRole', verifica también el tipo de usuario.
 */
export const PrivateRoutes = ({ allowedRole }) => {
  const { isAuthenticated, loading, userType } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  // 1. Si NO está autenticado, a la página de Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si se requiere un rol (ej: 'universidad') y el usuario NO lo tiene
  if (allowedRole && userType !== allowedRole) {
    // Lo mandamos a una página de "No Autorizado" o de vuelta a la Home
    return <Navigate to="/" replace />;
  }

  // 3. Si pasó las validaciones, muestra la página solicitada
  return <Outlet />;
};
