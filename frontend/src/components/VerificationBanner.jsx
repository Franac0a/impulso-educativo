import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { universityService } from "../services/university.service";

export const VerificationBanner = () => {
  const { isAuthenticated, userType } = useAuth();

  // Por defecto, asumimos que está verificado (banner oculto)
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo ejecutamos esta lógica si el usuario es una universidad logueada
    if (isAuthenticated && userType === "universidad") {
      const checkVerificationStatus = async () => {
        try {
          // 1. Buscamos el perfil de la institución
          const response = await universityService.getMyInstitution();

          // 2. Revisamos el campo 'isVerified'
          // (Este campo lo añadiste en 'universidades.model.js')
          if (
            response.institucion &&
            response.institucion.isVerified === false
          ) {
            // Si es 'false', activamos el banner
            setIsVerified(false);
          } else {
            // Si es 'true' (o si no hay perfil aún), el banner no se muestra
            setIsVerified(true);
          }
        } catch (error) {
          // Si hay un error (ej: 404 si aún no crearon el perfil),
          // tampoco mostramos el banner.
          setIsVerified(true);
        } finally {
          setLoading(false);
        }
      };

      checkVerificationStatus();
    } else {
      // Si no es una universidad, no hay nada que cargar
      setLoading(false);
      setIsVerified(true); // Oculta el banner
    }
    // Se ejecuta cada vez que el estado de autenticación cambia
  }, [isAuthenticated, userType]);

  // --- Lógica de Renderizado ---

  // No mostramos nada si:
  // 1. Está cargando
  // 2. No es una universidad
  // 3. Ya está verificada
  if (loading || !isAuthenticated || userType !== "universidad" || isVerified) {
    return null;
  }

  // ¡Solo se muestra si es universidad Y isVerified es false!
  return (
    // Usamos 'top-20' para que aparezca JUSTO DEBAJO de tu Navbar fija
    // Usamos 'z-40' (Navbar tiene z-50)
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 fixed top-20 w-full z-40 animate-pulse">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Ícono de Advertencia */}
          <svg
            className="w-6 h-6 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.332-.216 3.006-1.742 3.006H4.42c-1.526 0-2.492-1.674-1.742-3.006l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <p className="font-bold">
              Tu perfil está pendiente de verificación.
            </p>
            <p className="text-sm">
              Ya puedes cargar carreras, pero no serán visibles para los
              estudiantes hasta que tu cuenta sea aprobada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
