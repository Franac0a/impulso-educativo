// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { useNavigate } from "react-router";

export const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data.perfil);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        No se pudo cargar el perfil.
      </p>
    );

  const riasecProfile = user.riasecProfile
    ? JSON.parse(user.riasecProfile)
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Mi Perfil</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Correo:</strong> {user.email}
        </p>
        <p>
          <strong>Tipo de usuario:</strong> Estudiante
        </p>

        <div className="mt-6 p-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-2">
            Perfil Vocacional (RIASEC)
          </h2>

          {riasecProfile && riasecProfile.length > 0 ? (
            <p className="text-teal-700 font-bold text-lg">
              {riasecProfile.join(" - ")}
            </p>
          ) : (
            <div>
              <p>¡Test pendiente!</p>
              <button
                onClick={() => navigate("/test-vocacional")}
                className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Realizar el Test Vocacional ahora
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
