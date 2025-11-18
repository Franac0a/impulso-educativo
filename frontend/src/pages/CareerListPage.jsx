import React, { useState, useEffect } from "react";
// Importar useNavigate para la navegación a la página de detalles
import { useNavigate } from "react-router"; // Usamos 'react-router' según tu configuración
// ✅ Importación ajustada al nombre del archivo de servicio
import { careersService } from "../services/careers.service";
// ✅ Importación de useForm
import { useForm } from "../hooks/useForm";

// Opciones de filtro RIASEC (Holland)
const riasecOptions = {
  R: "Realista",
  I: "Investigador",
  A: "Artístico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

// Áreas de estudio (basado en tu modelo)
const areaOptions = [
  "Tecnología",
  "Salud",
  "Humanidades",
  "Artes",
  "Ciencias Exactas",
  "Ciencias Sociales",
];

export const CareerListPage = () => {
  // Inicializar useNavigate
  const navigate = useNavigate();

  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usamos tu hook para manejar los filtros
  const { values, handleChange, setValues } = useForm({
    search: "",
    area: "",
    tipo: "",
  });

  // Estado para el filtro RIASEC (lo manejamos por separado para checkboxes)
  const [riasecFilter, setRiasecFilter] = useState("");

  // --- Lógica de la API ---

  const fetchCareers = async (filters) => {
    setLoading(true);
    try {
      // Llama a: GET /api/carreras?search=...&area=...&tipo=...
      // Recordatorio: El backend ya filtra por isVerified: true
      const data = await careersService.getAllPublic(filters);
      setCarreras(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las carreras. Intenta de nuevo más tarde.");
      setCarreras([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el clic y navegar a la página de detalles
  const handleCareerClick = (careerId) => {
    navigate(`/carreras/${careerId}`);
  };

  // Cargar al inicio y cuando cambian los filtros
  useEffect(() => {
    // Si no hay filtros RIASEC, solo usamos los filtros de texto
    const filters = { ...values };

    // Si tienes lógica avanzada para RIASEC, la aplicarías aquí
    // Por ahora, aplicamos los filtros de texto
    fetchCareers(filters);
  }, [values]); // Re-ejecutar cuando cambia search, area o tipo

  // Manejar búsqueda al enviar el formulario (o al cambiar un filtro)
  const handleSearch = (e) => {
    e.preventDefault();
    // El useEffect ya se encarga de llamar a fetchCareers cuando 'values' cambia
  };

  // ⚠️ Función helper para asegurar que RIASEC sea un array
  const formatRiasec = (riasecJson) => {
    if (!riasecJson) return [];
    try {
      // Intenta parsear
      const parsed = JSON.parse(riasecJson);
      // Asegura que sea un array antes de usar join. Si es un string u objeto simple, retorna array vacío.
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      // Si el JSON es inválido (por un error de la BD), retorna vacío
      return [];
    }
  };

  // --- Renderizado ---

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        Explorá Carreras y Universidades
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- COLUMNA DE FILTROS (IZQUIERDA) --- */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Filtro de Búsqueda por Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar por Nombre
              </label>
              <input
                type="text"
                name="search"
                value={values.search}
                onChange={handleChange}
                placeholder="Ej: Programación, Abogacía"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Filtro por Área */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área de Estudio
              </label>
              <select
                name="area"
                value={values.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Todas las Áreas</option>
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Carrera
              </label>
              <select
                name="tipo"
                value={values.tipo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Todos los Tipos</option>
                <option value="Grado">Grado</option>
                <option value="Tecnicatura">Tecnicatura</option>
                <option value="Posgrado">Posgrado</option>
              </select>
            </div>

            {/* Filtro RIASEC (Explicativo) */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-teal-700 mb-2">
                Filtrar por Perfil RIASEC
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                (Requiere haber completado el test vocacional)
              </p>
              <div className="space-y-2">
                {Object.entries(riasecOptions).map(([key, name]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="radio"
                      name="riasec"
                      id={`riasec-${key}`}
                      value={key}
                      // Aquí usarías setRiasecFilter para cambiar el estado
                      // Esto es solo para mostrar, la lógica avanzada es compleja
                      disabled
                      className="text-teal-600 focus:ring-teal-500 cursor-not-allowed"
                    />
                    <label
                      htmlFor={`riasec-${key}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {name} ({key})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Este botón ya no es necesario, pero lo dejamos por si acaso */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 mt-4 hidden"
            >
              Aplicar Filtros
            </button>
          </form>
        </div>

        {/* --- COLUMNA DE RESULTADOS (DERECHA) --- */}
        <div className="lg:col-span-3">
          {/* Estados de Carga y Error */}
          {loading && (
            <p className="text-center text-gray-500 text-lg">
              Cargando ofertas académicas...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
              {error}
            </p>
          )}

          {/* Lista de Resultados */}
          <div className="grid gap-6 md:grid-cols-2">
            {!loading &&
              carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  // Hacemos la tarjeta cliqueable para navegar a los detalles
                  onClick={() => handleCareerClick(carrera.id)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer" // Añadido cursor-pointer
                >
                  {/* Título y Link */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {carrera.nombre}
                  </h3>

                  {/* Universidad */}
                  {carrera.Universidad && (
                    <p className="text-base font-semibold text-indigo-600">
                      {carrera.Universidad.nombre} ({carrera.Universidad.alias})
                    </p>
                  )}

                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {carrera.descripcion}
                  </p>

                  {/* Detalles y Tags */}
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                      {carrera.tipo}
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                      {carrera.duracion_anios} Años
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                      Área: {carrera.area_estudio}
                    </span>

                    {/* ⚠️ LÓGICA RIASEC CORREGIDA */}
                    {carrera.perfiles_riasec_compatibles && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                        RIASEC:{" "}
                        {formatRiasec(carrera.perfiles_riasec_compatibles).join(
                          ", "
                        )}
                      </span>
                    )}
                  </div>

                  {/* Link de Acción (Ej. Ver más) */}
                  <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                    <a
                      href={carrera.link_inscripcion}
                      target="_blank"
                      rel="noopener noreferrer"
                      // Importante: detener la propagación para que no active handleCareerClick
                      onClick={(e) => e.stopPropagation()}
                      className="text-teal-600 hover:underline font-semibold"
                    >
                      Sitio Web &rarr;
                    </a>
                  </div>
                </div>
              ))}
          </div>

          {/* Mensaje de "No hay resultados" */}
          {!loading && !error && carreras.length === 0 && (
            <p className="text-center text-gray-500 text-lg p-8 bg-white rounded-lg shadow">
              No se encontraron carreras que coincidan con tu búsqueda o tu
              universidad no está verificada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
