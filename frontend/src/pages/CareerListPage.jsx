import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ⚠️ DESCOMENTA TUS IMPORTS:
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
  const [localUserRiasec, setLocalUserRiasec] = useState([]);
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

  // --- LOGIC: AUTOCARGA PERFIL ---
  useEffect(() => {
    const loadUserProfile = async () => {
      if (propUserRiasec && propUserRiasec.length > 0) return;
      try {
        const response = await userService.getProfile();
        const perfilData = response.perfil || response;
        if (perfilData && perfilData.riasecProfile) {
          const clean = (input) => {
            if (Array.isArray(input)) return input;
            if (typeof input === "string") {
              if (input.trim().startsWith("["))
                try {
                  return JSON.parse(input);
                } catch (e) {}
              return input.includes(",")
                ? input.split(",").map((s) => s.trim())
                : input.split("");
            }
            return [];
          };
          let temp = clean(perfilData.riasecProfile);
          if (typeof temp === "string") temp = clean(temp);
          if (Array.isArray(temp)) {
            setLocalUserRiasec(
              temp.flatMap((i) =>
                typeof i === "string" && i.length > 1 && i.length <= 3
                  ? i.split("")
                  : i
              )
            );
          }
        }
      } catch (err) {}
    };
    loadUserProfile();
  }, [propUserRiasec]);

  // --- LOGIC: PARSEO ---
  const formatRiasec = (riasecJson) => {
    if (!riasecJson) return [];
    let parsed = riasecJson;
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed.replace(/'/g, '"'));
      } catch (e) {
        return [];
      }
    }
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch (e) {
        return [];
      }
    }
    if (Array.isArray(parsed)) {
      return parsed.flatMap((i) =>
        typeof i === "string" && i.length > 1 && i.length <= 3 ? i.split("") : i
      );
    }
    return [];
  };

  // --- LOGIC: MATCHING ---
  const checkRiasecMatch = (riasecJson, userProfile) => {
    if (!userProfile || userProfile.length === 0) return false;
    const carreraRiasec = formatRiasec(riasecJson);
    if (carreraRiasec.length === 0) return false;
    const userClean = userProfile.map((r) =>
      String(r).toUpperCase().trim().charAt(0)
    );
    return carreraRiasec.some((r) =>
      userClean.includes(String(r).toUpperCase().trim().charAt(0))
    );
  };

  // --- LOGIC: FETCH ---
  const fetchCareers = async () => {
    setLoading(true);
    setRiasecWarning(null);
    try {
      let data = await careerService.getAllPublic({
        area: values.area,
        tipo: values.tipo,
      });
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
      setError("No se pudieron cargar las universidades.");
      setUniversidades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showUniversities) fetchUniversities();
    else fetchCareers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values,
    uniFilters,
    showUniversities,
    onlyRiasec,
    JSON.stringify(userRiasec),
  ]);

  const handleCareerClick = (id) => navigate(`/carreras/${id}`);
  const handleUniversityClick = (id) => navigate(`/universidades/${id}`);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {/* TITULO PRINCIPAL */}
      <div className="text-center mb-10 pt-20 md:pt-24">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Explorá tu Futuro
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Descubrí la oferta académica de Formosa filtrada especialmente para
          vos.
        </p>
      </div>

      {/* BARRA DE NAVEGACIÓN Y FILTRO RIASEC */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <div className="bg-white p-1 rounded-full shadow-sm border border-gray-200 inline-flex">
          <button
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              !showUniversities
                ? "bg-teal-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setShowUniversities(false)}
          >
            Carreras
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              showUniversities
                ? "bg-teal-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setShowUniversities(true)}
          >
            Universidades
          </button>
        </div>

        <button
          className={`px-6 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 flex items-center gap-2 ${
            onlyRiasec
              ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm"
              : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
          }`}
          onClick={() => setOnlyRiasec(!onlyRiasec)}
        >
          {onlyRiasec ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Filtro RIASEC Activo
            </>
          ) : (
            <>
              <span></span> Solo compatibles con mi Test
            </>
          )}
        </button>
      </div>

      {onlyRiasec && riasecWarning && (
        <div className="max-w-2xl mx-auto mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <p className="text-sm text-yellow-800 font-medium">
              {riasecWarning}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- SIDEBAR FILTROS --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
            <h2 className="text-lg font-bold mb-5 text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrar por:
            </h2>
            <div className="space-y-5">
              {!showUniversities && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Buscar
                    </label>
                    <input
                      type="text"
                      name="search"
                      value={values.search}
                      onChange={handleChange}
                      placeholder="Ej: Programación"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Área de Estudio
                    </label>
                    <select
                      name="area"
                      value={values.area}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm text-gray-700 cursor-pointer"
                    >
                      <option value="">Todas las áreas</option>
                      {areaOptions.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Tipo de Título
                    </label>
                    <select
                      name="tipo"
                      value={values.tipo}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm text-gray-700 cursor-pointer"
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
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Gestión
                    </label>
                    <select
                      name="tipo_gestion"
                      value={uniFilters.tipo_gestion}
                      onChange={handleUniversityChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm text-gray-700 cursor-pointer"
                    >
                      <option value="">Todas</option>
                      {tipoUniversidadOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Nivel Educativo
                    </label>
                    <select
                      name="nivel"
                      value={uniFilters.nivel}
                      onChange={handleUniversityChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm text-gray-700 cursor-pointer"
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
        </div>

        {/* --- GRID RESULTADOS --- */}
        <div className="lg:col-span-3">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-medium">
                Cargando resultados...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {/* CARD CARRERA */}
            {!loading &&
              !showUniversities &&
              carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  onClick={() => handleCareerClick(carrera.id)}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="p-6 flex-grow">
                    {carrera.Universidad && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {carrera.Universidad.logo_url ? (
                            <img
                              src={carrera.Universidad.logo_url}
                              alt="Logo"
                              className="w-full h-full object-cover"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          ) : (
                            <span className="text-xs font-bold text-teal-600">
                              {carrera.Universidad.alias?.substring(0, 2) ||
                                "U"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider truncate">
                            {carrera.Universidad.alias || "Universidad"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {carrera.Universidad.provincia}
                          </p>
                        </div>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-teal-700 transition-colors">
                      {carrera.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {carrera.descripcion}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {carrera.tipo}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                        {carrera.duracion_anios} Años
                      </span>
                      {carrera.perfiles_riasec_compatibles && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {formatRiasec(
                            carrera.perfiles_riasec_compatibles
                          ).join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end">
                    <span className="text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Ver detalles{" "}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}

            {/* CARD UNIVERSIDAD */}
            {!loading &&
              showUniversities &&
              universidades.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => handleUniversityClick(uni.id)}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer flex items-center p-6 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden mr-5">
                    {uni.logo_url ? (
                      <img
                        src={uni.logo_url}
                        alt={uni.alias}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="text-xl font-bold text-indigo-600">
                        {uni.alias ? uni.alias.substring(0, 2) : "U"}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 truncate group-hover:text-indigo-700 transition-colors">
                      {uni.nombre}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {uni.provincia}
                      </span>
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {uni.tipo_gestion}
                      </span>
                      {uni.nivel && (
                        <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                          {uni.nivel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 text-gray-300 group-hover:text-indigo-500 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
          </div>

          {/* ESTADO VACÍO */}
          {!loading &&
            !error &&
            ((showUniversities && universidades.length === 0) ||
              (!showUniversities && carreras.length === 0)) && (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                  <svg
                    className="w-10 h-10 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No encontramos resultados
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Intenta ajustar los filtros o tu búsqueda para ver más
                  opciones.
                </p>
                {onlyRiasec && (
                  <button
                    onClick={() => setOnlyRiasec(false)}
                    className="mt-6 text-teal-600 font-bold text-sm hover:underline"
                  >
                    Desactivar filtro RIASEC
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
