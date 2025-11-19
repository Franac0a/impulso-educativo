import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user.service";

export const UserProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await userService.getProfile();
        // ⚠️ axios ya devuelve response.data
        setPerfil(response.perfil || null);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setError("No se pudo cargar el perfil.");
      } finally {
        setCargandoPerfil(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading || cargandoPerfil) {
    return (
      <div className="text-center mt-20">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="text-center mt-20">
        <p>No se encontró el perfil del usuario.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <p>
        <strong>Nombre:</strong> {perfil.name}
      </p>
      <p>
        <strong>Email:</strong> {perfil.email}
      </p>
      <p>
        <strong>Tipo:</strong> {perfil.type}
      </p>
      <p>
        <strong>Perfil RIASEC:</strong>{" "}
        {perfil.riasecProfile || "No completado"}
      </p>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};
