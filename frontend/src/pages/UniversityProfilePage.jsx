import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { universityService } from "../services/university.service";
import { careerService } from "../services/career.service";

const riasecOptions = {
  R: "Realista",
  I: "Investigador",
  A: "Artístico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

export const UniversityProfilePage = ({ userRiasec = [] }) => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [onlyRiasec, setOnlyRiasec] = useState(false);

  const formatRiasec = (riasecJson) => {
    if (!riasecJson) return [];
    try {
      const parsed = JSON.parse(riasecJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const uni = await universityService.getById(id);
      setUniversity(uni);

      let uniCarreras = await careerService.getAllPublic({ universidadId: id });

      if (onlyRiasec && userRiasec.length > 0) {
        uniCarreras = uniCarreras.filter((c) => {
          const riasec = formatRiasec(c.perfiles_riasec_compatibles);
          return riasec.some((r) => userRiasec.includes(r));
        });
      }

      setCarreras(uniCarreras);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el perfil de la universidad.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, onlyRiasec]);

  if (loading)
    return <p className="text-center text-gray-500 mt-8">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!university) return null;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tarjeta de universidad */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <div className="flex flex-col items-center">
            {university.logo_url ? (
              <img
                src={university.logo_url}
                alt={university.alias}
                className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mb-4 bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-2xl border border-teal-200">
                {university.alias ? university.alias.substring(0, 2) : "U"}
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {university.nombre}
            </h2>
            <p className="text-sm text-gray-500">{university.provincia}</p>
            <p className="text-sm text-gray-600 mt-1">
              Tipo: {university.tipo_gestion}
            </p>
            <p className="text-sm text-gray-600">Nivel: {university.nivel}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-2">
              Biografía
            </h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {university.biografia || "Sin biografía disponible."}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setOnlyRiasec(!onlyRiasec)}
              className={`w-full px-4 py-2 rounded-lg font-semibold ${
                onlyRiasec ? "bg-teal-600 text-white" : "bg-gray-200"
              }`}
            >
              {onlyRiasec
                ? "Mostrar todas las carreras"
                : "Mostrar solo carreras RIASEC"}
            </button>
          </div>
        </div>

        {/* Carreras */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carreras</h2>
          {carreras.length === 0 && (
            <p className="text-gray-500">
              No hay carreras disponibles para mostrar.
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {carreras.map((carrera) => (
              <div
                key={carrera.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {carrera.nombre}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {carrera.descripcion}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {carrera.tipo}
                  </span>
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                    {carrera.duracion_anios} Años
                  </span>
                  {carrera.perfiles_riasec_compatibles && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {formatRiasec(carrera.perfiles_riasec_compatibles).join(
                        ", "
                      )}
                    </span>
                  )}
                </div>

                {/* Información adicional */}
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  {carrera.requisitos && (
                    <p>
                      <strong>Requisitos:</strong> {carrera.requisitos}
                    </p>
                  )}
                  {carrera.documentos && (
                    <p>
                      <strong>Documentos:</strong> {carrera.documentos}
                    </p>
                  )}
                  {carrera.inscripcion && (
                    <p>
                      <strong>Inscripción:</strong> {carrera.inscripcion}
                    </p>
                  )}
                  {carrera.examen_ingreso && (
                    <p>
                      <strong>Examen de ingreso:</strong>{" "}
                      {carrera.examen_ingreso}
                    </p>
                  )}
                  {carrera.cursillo && (
                    <p>
                      <strong>Cursillo:</strong> {carrera.cursillo}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                  <a
                    href={carrera.link_inscripcion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline font-semibold"
                  >
                    Sitio Web &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
