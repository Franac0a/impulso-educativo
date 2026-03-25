import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { careerService } from "../services/career.service";

export const CareerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [carrera, setCarrera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const data = await careerService.getById(id);
        setCarrera(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información de la carrera.");
      } finally {
        setLoading(false);
      }
    };
    loadCareer();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Cargando detalles...</div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!carrera)
    return <div className="p-10 text-center">Carrera no encontrada.</div>;

  // Asegurarse de que riasecTags sea siempre un array
  let riasecTags = [];
  if (carrera.perfiles_riasec_compatibles) {
    try {
      const parsed = JSON.parse(carrera.perfiles_riasec_compatibles);
      riasecTags = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      riasecTags = [];
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="text-teal-200 hover:text-white mb-4 flex items-center"
          >
            &larr; Volver al listado
          </button>
          <h1 className="text-4xl font-bold mb-2">{carrera.nombre}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {carrera.tipo}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {carrera.area_estudio}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {carrera.duracion_anios} Años
            </span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Carrera */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sobre la carrera
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {carrera.descripcion || "No hay descripción disponible."}
            </p>
          </div>

          {riasecTags.length > 0 && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Perfil Vocacional Sugerido
              </h2>
              <p className="text-gray-600 mb-4">
                Esta carrera es ideal si tus resultados en el test vocacional
                incluyen:
              </p>
              <div className="flex gap-3 flex-wrap">
                {riasecTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold text-lg shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Universidad */}
        <div className="lg:col-span-1">
          {carrera.Universidad && (
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-500 sticky top-24">
              <div className="flex items-center mb-4">
                {carrera.Universidad.logo_url ? (
                  <img
                    src={carrera.Universidad.logo_url}
                    alt={carrera.Universidad.alias}
                    className="w-16 h-16 rounded-full object-cover border border-gray-200 mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl mr-4">
                    {carrera.Universidad.alias?.substring(0, 2) || "U"}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {carrera.Universidad.nombre}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {carrera.Universidad.provincia}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Gestión</span>
                  <span className="font-medium text-gray-800">
                    {carrera.Universidad.tipo_gestion}
                  </span>
                </div>
                {carrera.Universidad.sitio_web && (
                  <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Web</span>
                    <a
                      href={carrera.Universidad.sitio_web}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 hover:underline truncate max-w-[150px]"
                    >
                      Visitar sitio
                    </a>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="space-y-3">
                {carrera.link_inscripcion && (
                  <a
                    href={carrera.link_inscripcion}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    Inscribirse / Más Info
                  </a>
                )}

                <Link
                  to={`/universidades/${carrera.Universidad.id}`}
                  className="block w-full bg-white border border-gray-300 text-gray-700 text-center font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Ver Perfil de Universidad
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
