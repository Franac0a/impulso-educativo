import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Cargando...</h1>;

  // Si no está autenticado, redirige a la página de Login
  if (!user && !loading) return <Navigate to="/login" replace />;

  // Si está autenticado, muestra el contenido de la ruta anidada
  return <Outlet />;
}
