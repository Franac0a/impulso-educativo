import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { universityService } from "../services/university.service";
import { careerService } from "../services/career.service";

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

  const [institutionId, setInstitutionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRiasecHelp, setShowRiasecHelp] = useState(false);

  const { values, errors, setErrors, handleChange, handleSubmit, resetForm } =
    useForm({
      nombre: "",
      descripcion: "",
      tipo: "Grado",
      area_estudio: "Tecnología",
      duracion_anios: "",
      perfiles_riasec_compatibles: "",
    });

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await universityService.getMyInstitution();
        setInstitutionId(response.institucion.id);
      } catch (err) {
        setError(
          "No encontramos el perfil de tu institución. Debes crearlo antes de publicar carreras.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInstitution();
  }, []);

  // 2. Submit
  const handleCreateCareer = async (formData) => {
    try {
      const parsedProfiles = formData.perfiles_riasec_compatibles
        .split(",")
        .map((s) => s.trim().toUpperCase());

      const dataToSend = {
        ...formData,
        duracion_anios: parseInt(formData.duracion_anios, 10),
        perfiles_riasec_compatibles: JSON.stringify(parsedProfiles),
        institucion_id: institutionId,
      };

      await careerService.create(dataToSend);

      alert("¡Carrera creada exitosamente!");
      resetForm();
      navigate("/dashboard/mis-carreras");
    } catch (err) {
      setErrors({ api: err.message || "Error al crear la carrera." });
    }
  };

  const onSubmit = handleSubmit(handleCreateCareer, validateCareer);

  // --- RENDER: LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Verificando permisos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acción Requerida
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/dashboard/crear-perfil"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-transform transform hover:-translate-y-1"
          >
            Crear Perfil Institucional
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDER: FORMULARIO ---
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
            Cargar Nueva Carrera
          </h1>
          <p className="text-gray-500">
            Agrega una nueva oferta académica para que los estudiantes puedan
            encontrarla.
          </p>
        </div>

        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.api}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          {/* SECCIÓN 1: DATOS PRINCIPALES */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">
                1
              </span>
              Información General
            </h3>

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
                placeholder="Ej: Licenciatura en Sistemas"
                className={`w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  errors.nombre ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.nombre}
                </p>
              )}
            </div>

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
                placeholder="Describe brevemente el perfil del egresado y los objetivos de la carrera..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* SECCIÓN 2: DETALLES ACADÉMICOS */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm">
                2
              </span>
              Detalles Académicos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="tipo"
                >
                  Tipo de Título
                </label>
                <div className="relative">
                  <select
                    name="tipo"
                    id="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${
                      errors.tipo ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    {tiposDeCarrera.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.tipo && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.tipo}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="duracion_anios"
                >
                  Duración (Años)
                </label>
                <input
                  type="number"
                  name="duracion_anios"
                  id="duracion_anios"
                  value={values.duracion_anios}
                  onChange={handleChange}
                  placeholder="Ej: 5"
                  className={`w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                    errors.duracion_anios ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.duracion_anios && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.duracion_anios}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="area_estudio"
                >
                  Área de Estudio
                </label>
                <div className="relative">
                  <select
                    name="area_estudio"
                    id="area_estudio"
                    value={values.area_estudio}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${
                      errors.area_estudio ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    {areasDeEstudio.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.area_estudio && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.area_estudio}
                  </p>
                )}
              </div>

              {/* 🟢 NUEVA SECCIÓN CON AYUDA VISUAL PARA RIASEC */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="perfiles_riasec_compatibles"
                  >
                    Códigos RIASEC (Ej: R,I,A)
                  </label>
                  {/* Botón de ayuda */}
                  <button
                    type="button"
                    onClick={() => setShowRiasecHelp(!showRiasecHelp)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold bg-indigo-50 px-2 py-1 rounded-md transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {showRiasecHelp ? "Ocultar ayuda" : "¿Qué es esto?"}
                  </button>
                </div>

                {/* Caja de ayuda desplegable */}
                {showRiasecHelp && (
                  <div className="mb-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-gray-700 animate-fadeIn">
                    <p className="font-bold text-indigo-700 mb-2 text-sm">
                      Guía de Clasificación Vocacional:
                    </p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <li>
                        <strong className="text-red-600">R</strong> (Realista):
                        Práctico, herramientas, técnico.
                      </li>
                      <li>
                        <strong className="text-yellow-600">I</strong>{" "}
                        (Investigador): Ciencia, análisis, lógica.
                      </li>
                      <li>
                        <strong className="text-orange-600">A</strong>{" "}
                        (Artístico): Creatividad, diseño, expresión.
                      </li>
                      <li>
                        <strong className="text-green-600">S</strong> (Social):
                        Ayudar, enseñar, salud.
                      </li>
                      <li>
                        <strong className="text-blue-600">E</strong>{" "}
                        (Emprendedor): Liderazgo, negocios, ventas.
                      </li>
                      <li>
                        <strong className="text-purple-600">C</strong>{" "}
                        (Convencional): Organización, datos, oficina.
                      </li>
                    </ul>
                  </div>
                )}

                <input
                  type="text"
                  name="perfiles_riasec_compatibles"
                  id="perfiles_riasec_compatibles"
                  value={values.perfiles_riasec_compatibles}
                  onChange={handleChange}
                  placeholder="Separa con comas: R, I, A"
                  className={`w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                    errors.perfiles_riasec_compatibles
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Códigos del test vocacional compatibles.
                </p>
                {errors.perfiles_riasec_compatibles && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.perfiles_riasec_compatibles}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botón de Submit */}
          <div className="pt-6 text-right border-t border-gray-100">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Publicar Carrera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
