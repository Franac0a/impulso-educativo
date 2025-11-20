import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { careerService } from "../services/career.service";
import { universityService } from "../services/university.service";
import { userService } from "../services/user.service";
import { useForm } from "../hooks/useForm";

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

export const CareerListPage = ({ userRiasec: propUserRiasec }) => {
  const navigate = useNavigate();

  // Estado local para el perfil si no viene por props
  const [localUserRiasec, setLocalUserRiasec] = useState([]);
  // Prioridad: Props > Local
  const userRiasec =
    propUserRiasec && propUserRiasec.length > 0
      ? propUserRiasec
      : localUserRiasec;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUniversities, setShowUniversities] = useState(false);
  const [onlyRiasec, setOnlyRiasec] = useState(false);
  const [riasecWarning, setRiasecWarning] = useState(null);

  const [carreras, setCarreras] = useState([]);
  const [universidades, setUniversidades] = useState([]);

  const { values, handleChange } = useForm({ search: "", area: "", tipo: "" });
  const [uniFilters, setUniFilters] = useState({ tipo_gestion: "", nivel: "" });

  const handleUniversityChange = (e) => {
    const { name, value } = e.target;
    setUniFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------
  // 1. AUTOCARGA DEL PERFIL (Solución al cartel amarillo)
  // ---------------------------------------------------------
  useEffect(() => {
    const loadUserProfile = async () => {
      // Si ya vino por props, no hacemos nada
      if (propUserRiasec && propUserRiasec.length > 0) return;

      try {
        const response = await userService.getProfile();
        const perfilData = response.perfil || response;

        if (perfilData && perfilData.riasecProfile) {
          let parsedProfile = [];
          const rawProfile = perfilData.riasecProfile;

          // Función auxiliar para limpiar datos
          const cleanUserRiasec = (input) => {
            if (Array.isArray(input)) return input;
            if (typeof input === "string") {
              if (input.trim().startsWith("[")) {
                try {
                  return JSON.parse(input);
                } catch (e) {}
              }
              return input.includes(",")
                ? input.split(",").map((s) => s.trim())
                : input.split("");
            }
            return [];
          };

          let temp = cleanUserRiasec(rawProfile);
          if (typeof temp === "string") temp = cleanUserRiasec(temp); // Intento doble capa

          if (Array.isArray(temp)) {
            // Aplanamos y separamos strings cortos (ej: "RIA" -> "R","I","A")
            parsedProfile = temp.flatMap((item) =>
              typeof item === "string" && item.length > 1 && item.length <= 3
                ? item.split("")
                : item
            );
          }
          setLocalUserRiasec(parsedProfile);
        }
      } catch (err) {
        // Silencioso en producción o warning leve
        // console.warn("No se pudo cargar perfil para filtro automático");
      }
    };

    loadUserProfile();
  }, [propUserRiasec]);

  // ---------------------------------------------------------
  // 2. FUNCIÓN DE PARSEO BLINDADA (Soporta JSON string doble)
  // ---------------------------------------------------------
  const formatRiasec = (riasecJson) => {
    if (!riasecJson) return [];

    let parsed = riasecJson;

    // CAPA 1
    if (typeof parsed === "string") {
      try {
        const clean = parsed.replace(/'/g, '"');
        parsed = JSON.parse(clean);
      } catch (e) {
        return [];
      }
    }

    // CAPA 2 (Doble Stringify)
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch (e) {
        return [];
      }
    }

    // CAPA 3 (Validación final y Aplanado)
    if (Array.isArray(parsed)) {
      return parsed.flatMap((item) => {
        if (typeof item === "string" && item.length > 1 && item.length <= 3) {
          return item.split("");
        }
        return item;
      });
    }
    return [];
  };

  // ---------------------------------------------------------
  // 3. LÓGICA DE COINCIDENCIAS
  // ---------------------------------------------------------
  const checkRiasecMatch = (riasecJson, userProfile) => {
    if (!userProfile || userProfile.length === 0) return false;

    const carreraRiasec = formatRiasec(riasecJson);
    if (carreraRiasec.length === 0) return false;

    const userClean = userProfile.map((r) =>
      String(r).toUpperCase().trim().charAt(0)
    );

    return carreraRiasec.some((r) => {
      const carreraCode = String(r).toUpperCase().trim().charAt(0);
      return userClean.includes(carreraCode);
    });
  };

  // ---------------------------------------------------------
  // 4. FETCH DE DATOS
  // ---------------------------------------------------------
  const fetchCareers = async () => {
    setLoading(true);
    setRiasecWarning(null);
    try {
      const filters = { area: values.area, tipo: values.tipo };
      let data = await careerService.getAllPublic(filters);

      if (values.search) {
        const searchLower = values.search.toLowerCase();
        data = data.filter((c) => c.nombre.toLowerCase().includes(searchLower));
      }

      if (onlyRiasec) {
        if (!userRiasec || userRiasec.length === 0) {
          setRiasecWarning(
            "No detectamos resultados de tu test vocacional. ¿Ya lo realizaste?"
          );
          data = [];
        } else {
          data = data.filter((c) =>
            checkRiasecMatch(c.perfiles_riasec_compatibles, userRiasec)
          );
        }
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
    setRiasecWarning(null);
    try {
      let data = await universityService.getAllPublic();
      if (uniFilters.tipo_gestion)
        data = data.filter((u) => u.tipo_gestion === uniFilters.tipo_gestion);
      if (uniFilters.nivel)
        data = data.filter((u) => u.nivel === uniFilters.nivel);

      if (onlyRiasec) {
        if (!userRiasec || userRiasec.length === 0) {
          setRiasecWarning(
            "No se detectaron resultados para filtrar universidades."
          );
          data = [];
        } else {
          const filtered = await Promise.all(
            data.map(async (uni) => {
              try {
                const uniCarreras = await careerService.getAllPublic({
                  universidadId: uni.id,
                });
                const match = uniCarreras.some((c) =>
                  checkRiasecMatch(c.perfiles_riasec_compatibles, userRiasec)
                );
                return match ? uni : null;
              } catch (err) {
                return null;
              }
            })
          );
          data = filtered.filter(Boolean);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values,
    uniFilters,
    showUniversities,
    onlyRiasec,
    JSON.stringify(userRiasec),
  ]);

  const handleCareerClick = (careerId) => navigate(`/carreras/${careerId}`);
  const handleUniversityClick = (uniId) => navigate(`/universidades/${uniId}`);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        Explorá Carreras y Universidades
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            !showUniversities
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowUniversities(false)}
        >
          Carreras
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            showUniversities
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowUniversities(true)}
        >
          Universidades
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors border-2 ${
            onlyRiasec
              ? "bg-teal-100 text-teal-800 border-teal-500"
              : "bg-white text-gray-600 border-gray-300 hover:border-teal-400"
          }`}
          onClick={() => setOnlyRiasec(!onlyRiasec)}
        >
          {onlyRiasec ? "Filtro RIASEC Activo ✓" : "Solo resultados RIASEC"}
        </button>
      </div>

      {onlyRiasec && riasecWarning && (
        <div className="max-w-2xl mx-auto mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{riasecWarning}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTROS */}
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
                    value={uniFilters.tipo_gestion}
                    onChange={handleUniversityChange}
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
                    value={uniFilters.nivel}
                    onChange={handleUniversityChange}
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

        {/* RESULTADOS */}
        <div className="lg:col-span-3">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
              {error}
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {!loading &&
              !showUniversities &&
              carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  onClick={() => handleCareerClick(carrera.id)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
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
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full border border-indigo-200">
                      {carrera.tipo}
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full border border-teal-200">
                      {carrera.duracion_anios} Años
                    </span>
                    {carrera.perfiles_riasec_compatibles && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full border border-purple-200">
                        {formatRiasec(carrera.perfiles_riasec_compatibles).join(
                          ", "
                        )}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                    <button
                      className="text-teal-600 hover:text-teal-800 font-semibold text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(carrera.link_inscripcion, "_blank");
                      }}
                    >
                      Ver Sitio Web &rarr;
                    </button>
                  </div>
                </div>
              ))}

            {!loading &&
              showUniversities &&
              universidades.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => handleUniversityClick(uni.id)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    {uni.logo_url ? (
                      <img
                        src={uni.logo_url}
                        alt={uni.alias}
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl border border-teal-200">
                        {uni.alias ? uni.alias.substring(0, 2) : "U"}
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {uni.nombre}
                      </h3>
                      <p className="text-sm text-gray-500">{uni.provincia}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded">
                      {uni.tipo_gestion}
                    </span>
                    {uni.nivel && (
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded">
                        {uni.nivel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {!loading &&
            !error &&
            ((showUniversities && universidades.length === 0) ||
              (!showUniversities && carreras.length === 0)) && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-lg text-gray-500">
                  No se encontraron resultados.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
