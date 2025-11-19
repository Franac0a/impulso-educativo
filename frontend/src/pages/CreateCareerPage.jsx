import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router"; // ⚠️ de 'react-router'
import { useForm } from "../hooks/useForm";
import { universityService } from "../services/university.service";
import { careerService } from "../services/career.service";

// Opciones para los <select> basadas en tu "carrera.model.js"
const tiposDeCarrera = ["Grado", "Tecnicatura", "Posgrado"];
const areasDeEstudio = [
  "Tecnología",
  "Salud",
  "Humanidades",
  "Artes",
  "Ciencias Exactas",
  "Ciencias Sociales",
];

// Validación
const validateCareer = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.tipo) errors.tipo = "El tipo es requerido";
  if (!values.area_estudio) errors.area_estudio = "El área es requerida";
  if (!values.duracion_anios)
    errors.duracion_anios = "La duración es requerida";
  if (values.duracion_anios <= 0)
    errors.duracion_anios = "Debe ser un número positivo";
  if (!values.perfiles_riasec_compatibles)
    errors.perfiles_riasec_compatibles =
      "Los perfiles son requeridos (ej: R,I,A)";
  return errors;
};

export const CreateCareerPage = () => {
  const navigate = useNavigate();

  // Estado para guardar el ID de la institución
  const [institutionId, setInstitutionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { values, errors, setErrors, handleChange, handleSubmit, resetForm } =
    useForm({
      nombre: "",
      descripcion: "",
      tipo: "Grado", // Valor por defecto
      area_estudio: "Tecnología", // Valor por defecto
      duracion_anios: "",
      perfiles_riasec_compatibles: "", // Ej: R,I,A
    });

  // 1. Al cargar, buscamos el perfil de la Institución
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        // Usamos el servicio que llama a /api/universidades/mi-perfil
        const response = await universityService.getMyInstitution();
        // Guardamos el ID, que es lo que el backend necesita
        setInstitutionId(response.institucion.id);
      } catch (err) {
        // Si da error (ej: 404), es porque no crearon el perfil
        setError(
          "Error: Perfil de institución no encontrado. Debes crear el perfil de tu institución antes de poder cargar carreras."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInstitution();
  }, []);

  // 2. Función de Submit
  const handleCreateCareer = async (formData) => {
    try {
      // Preparamos los perfiles RIASEC (convertimos "R, I, A" a ["R", "I", "A"])
      const parsedProfiles = formData.perfiles_riasec_compatibles
        .split(",")
        .map((s) => s.trim().toUpperCase());

      const dataToSend = {
        ...formData,
        duracion_anios: parseInt(formData.duracion_anios, 10),
        perfiles_riasec_compatibles: JSON.stringify(parsedProfiles), // El backend espera un JSON
        institucion_id: institutionId, // ¡El ID que buscamos en el useEffect!
      };

      // Llamamos al servicio de creación
      await careerService.create(dataToSend);

      // Éxito
      alert("¡Carrera creada exitosamente!");
      resetForm();
      navigate("/dashboard/mis-carreras"); // Volvemos a la lista
    } catch (err) {
      setErrors({ api: err.message || "Error al crear la carrera." });
    }
  };

  const onSubmit = handleSubmit(handleCreateCareer, validateCareer);

  // --- Renderizado ---

  if (loading) {
    return (
      <div className="p-8 text-center">
        Verificando perfil de institución...
      </div>
    );
  }

  // Si hubo un error (ej: no hay perfil de institución)
  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Acción Requerida
        </h2>
        <p className="bg-red-100 p-4 rounded-lg text-red-800">{error}</p>
        <Link
          to="/dashboard" // (Debería ser /dashboard/perfil-institucion cuando exista)
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Crear Perfil de Institución
        </Link>
      </div>
    );
  }

  // Si todo está OK, mostramos el formulario
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Cargar Nueva Carrera
        </h1>

        {errors.api && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {errors.api}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="nombre"
            >
              Nombre de la Carrera
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={values.nombre}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.nombre}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              rows="4"
              value={values.descripcion}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo (Select) */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="tipo"
              >
                Tipo
              </label>
              <select
                name="tipo"
                id="tipo"
                value={values.tipo}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.tipo ? "border-red-500" : "border-gray-300"
                }`}
              >
                {tiposDeCarrera.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
              {errors.tipo && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.tipo}
                </p>
              )}
            </div>

            {/* Duración (Años) */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="duracion_anios"
              >
                Duración (en años)
              </label>
              <input
                type="number"
                name="duracion_anios"
                id="duracion_anios"
                value={values.duracion_anios}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.duracion_anios ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.duracion_anios && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.duracion_anios}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Área (Select) */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="area_estudio"
              >
                Área de Estudio
              </label>
              <select
                name="area_estudio"
                id="area_estudio"
                value={values.area_estudio}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.area_estudio ? "border-red-500" : "border-gray-300"
                }`}
              >
                {areasDeEstudio.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.area_estudio && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.area_estudio}
                </p>
              )}
            </div>

            {/* Perfiles RIASEC */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="perfiles_riasec_compatibles"
              >
                Perfiles RIASEC (ej: R,I,A)
              </label>
              <input
                type="text"
                name="perfiles_riasec_compatibles"
                id="perfiles_riasec_compatibles"
                value={values.perfiles_riasec_compatibles}
                onChange={handleChange}
                placeholder="R,I,A"
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.perfiles_riasec_compatibles
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.perfiles_riasec_compatibles && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.perfiles_riasec_compatibles}
                </p>
              )}
            </div>
          </div>

          {/* Botón de Submit */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Guardar Carrera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
