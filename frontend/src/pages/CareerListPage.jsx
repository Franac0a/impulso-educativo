import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { careerService } from "../services/career.service";
import { universityService } from "../services/university.service";
import { useForm } from "../hooks/useForm";

const riasecOptions = {
  R: "Realista",
  I: "Investigador",
  A: "Artístico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

const areaOptions = [
  "Tecnología",
  "Salud",
  "Humanidades",
  "Artes",
  "Ciencias Exactas",
  "Ciencias Sociales",
];

const tipoUniversidadOptions = ["Pública", "Privada"];
const nivelOptions = ["Terciario", "Universitario", "Tecnicatura"];

export const CareerListPage = ({ userRiasec = [] }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUniversities, setShowUniversities] = useState(false);
  const [onlyRiasec, setOnlyRiasec] = useState(false);

  const [carreras, setCarreras] = useState([]);
  const [universidades, setUniversidades] = useState([]);

  const { values, handleChange } = useForm({
    search: "",
    area: "",
    tipo: "",
    tipo_gestion: "",
    nivel: "",
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const filters = {
        area: values.area,
        tipo: values.tipo,
      };

      let data = await careerService.getAllPublic(filters);

      // Filtrar RIASEC si corresponde
      if (onlyRiasec && userRiasec.length > 0) {
        data = data.filter((c) => {
          const riasec = JSON.parse(c.perfiles_riasec_compatibles || "[]");
          return riasec.some((r) => userRiasec.includes(r));
        });
      }

      setCarreras(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las carreras.");
      setCarreras([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      let data = await universityService.getAllPublic({
        tipo_gestion: values.tipo_gestion,
        nivel: values.nivel,
      });

      // Filtrar RIASEC si corresponde
      if (onlyRiasec && userRiasec.length > 0) {
        const filtered = [];
        for (const uni of data) {
          const uniCarreras = await careerService.getAllPublic({
            universidadId: uni.id,
          });
          const match = uniCarreras.some((c) => {
            const riasec = JSON.parse(c.perfiles_riasec_compatibles || "[]");
            return riasec.some((r) => userRiasec.includes(r));
          });
          if (match) filtered.push(uni);
        }
        data = filtered;
      }

      setUniversidades(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las universidades.");
      setUniversidades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showUniversities) {
      fetchUniversities();
    } else {
      fetchCareers();
    }
  }, [values, showUniversities, onlyRiasec]);

  const handleCareerClick = (careerId) => navigate(`/carreras/${careerId}`);
  const handleUniversityClick = (uniId) => navigate(`/universidades/${uniId}`);

  const formatRiasec = (riasecJson) => {
    if (!riasecJson) return [];
    try {
      const parsed = JSON.parse(riasecJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        Explorá Carreras y Universidades
      </h1>

      {/* Switches */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            showUniversities ? "bg-gray-200" : "bg-teal-600 text-white"
          }`}
          onClick={() => setShowUniversities(false)}
        >
          Carreras
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            showUniversities ? "bg-teal-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowUniversities(true)}
        >
          Universidades
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            onlyRiasec ? "bg-teal-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setOnlyRiasec(!onlyRiasec)}
        >
          Solo resultados RIASEC
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h2>
          <div className="space-y-4">
            {!showUniversities && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buscar
                  </label>
                  <input
                    type="text"
                    name="search"
                    value={values.search}
                    onChange={handleChange}
                    placeholder="Ej: Programación"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Área
                  </label>
                  <select
                    name="area"
                    value={values.area}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todas</option>
                    {areaOptions.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todos</option>
                    <option value="Grado">Grado</option>
                    <option value="Tecnicatura">Tecnicatura</option>
                    <option value="Posgrado">Posgrado</option>
                  </select>
                </div>
              </>
            )}
            {showUniversities && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de gestión
                  </label>
                  <select
                    name="tipo_gestion"
                    value={values.tipo_gestion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todos</option>
                    {tipoUniversidadOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel
                  </label>
                  <select
                    name="nivel"
                    value={values.nivel}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todos</option>
                    {nivelOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-3">
          {loading && <p className="text-center text-gray-500">Cargando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid gap-6 md:grid-cols-2">
            {!loading &&
              !showUniversities &&
              carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  onClick={() => handleCareerClick(carrera.id)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {carrera.nombre}
                  </h3>
                  {carrera.Universidad && (
                    <div className="flex items-center mt-2 mb-3">
                      {carrera.Universidad.logo_url ? (
                        <img
                          src={carrera.Universidad.logo_url}
                          alt={carrera.Universidad.alias}
                          className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-200"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full mr-2 bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs border border-teal-200">
                          {carrera.Universidad.alias
                            ? carrera.Universidad.alias.substring(0, 2)
                            : "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-indigo-600">
                          {carrera.Universidad.nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {carrera.Universidad.provincia}
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {carrera.descripcion}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
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
                  <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                    <a
                      href={carrera.link_inscripcion}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-teal-600 hover:underline font-semibold"
                    >
                      Sitio Web &rarr;
                    </a>
                  </div>
                </div>
              ))}

            {!loading &&
              showUniversities &&
              universidades.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => handleUniversityClick(uni.id)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                >
                  {uni.logo_url ? (
                    <img
                      src={uni.logo_url}
                      alt={uni.alias}
                      className="w-12 h-12 rounded-full mb-2 object-cover border border-gray-200"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full mb-2 bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs border border-teal-200">
                      {uni.alias ? uni.alias.substring(0, 2) : "U"}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {uni.nombre}
                  </h3>
                  <p className="text-sm text-gray-500">{uni.provincia}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Tipo: {uni.tipo_gestion}
                  </p>
                </div>
              ))}
          </div>

          {!loading &&
            ((showUniversities && universidades.length === 0) ||
              (!showUniversities && carreras.length === 0)) && (
              <p className="text-center text-gray-500 p-8">
                No se encontraron resultados.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
