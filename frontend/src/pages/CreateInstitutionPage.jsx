import React from "react";
import { useNavigate } from "react-router-dom";

// ⚠️ INSTRUCCIONES PARA TU PROYECTO LOCAL:
// 1. DESCOMENTA las siguientes 2 líneas de importación.
// 2. BORRA la sección de "MOCKS PARA VISTA PREVIA" que está al final del archivo.

// import { useForm } from "../hooks/useForm";
// import { universityService } from "../services/university.service";

// Opciones para los <select>
const tiposDeGestion = ["Pública", "Privada"];
const provincias = ["Formosa", "Chaco", "Corrientes", "Misiones"];
const tiposDeDocumento = [
  "Estatuto de la Institución",
  "Habilitación Ministerial",
  "Otro",
];
const niveles = ["Terciario", "Universitario", "Tecnicatura"];

// Validación
const validateInstitution = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.tipo_gestion)
    errors.tipo_gestion = "El tipo de gestión es requerido";
  if (!values.provincia) errors.provincia = "La provincia es requerida";
  if (!values.tipo_documento)
    errors.tipo_documento = "Seleccione un tipo de documento";
  // La validación del archivo se hace verificando si el objeto existe
  if (!values.documento_archivo)
    errors.documento_archivo = "Debe adjuntar un documento";
  if (!values.nivel) errors.nivel = "El nivel educativo es requerido";
  return errors;
};

export const CreateInstitutionPage = () => {
  const navigate = useNavigate();

  const { values, errors, setErrors, setValues, handleChange, handleSubmit } =
    useForm({
      nombre: "",
      alias: "",
      tipo_gestion: "Pública",
      provincia: "Formosa",
      sitio_web: "",
      tipo_documento: "",
      documento_archivo: null,
      nivel: "",
    });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setValues({
        ...values,
        documento_archivo: event.target.files[0],
      });
      if (errors.documento_archivo) {
        setErrors((prev) => ({ ...prev, documento_archivo: undefined }));
      }
    }
  };

  const handleCreateProfile = async (formData) => {
    try {
      // Nota: En la versión real usas FormData, aquí en el mock simulamos el envío
      /* const data = new FormData();
      data.append("nombre", formData.nombre);
      ...
      await universityService.createInstitution(data);
      */

      await universityService.createInstitution(formData); // Llamada simulada

      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.mensaje ||
        err.message ||
        "Error al crear el perfil.";
      setErrors({ api: errorMessage });
    }
  };

  const onSubmit = handleSubmit(handleCreateProfile, validateInstitution);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
            Crear Institución
          </h1>
          <p className="text-gray-500">
            Completa los datos públicos de tu institución y adjunta la
            documentación de respaldo para ser verificada.
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
          {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">
                1
              </span>
              Datos Generales
            </h3>

            {/* Fila 1: Nombre y Alias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="nombre"
                >
                  Nombre Oficial
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                    errors.nombre
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Ej: Universidad Nacional de Formosa"
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
                  htmlFor="alias"
                >
                  Alias / Siglas
                </label>
                <input
                  type="text"
                  name="alias"
                  id="alias"
                  value={values.alias}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Ej: UNaF"
                />
              </div>
            </div>

            {/* Fila 2: Gestión y Provincia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="tipo_gestion"
                >
                  Tipo de Gestión
                </label>
                <div className="relative">
                  <select
                    name="tipo_gestion"
                    id="tipo_gestion"
                    value={values.tipo_gestion}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${
                      errors.tipo_gestion ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    {tiposDeGestion.map((tipo) => (
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
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.tipo_gestion && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.tipo_gestion}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="provincia"
                >
                  Provincia
                </label>
                <div className="relative">
                  <select
                    name="provincia"
                    id="provincia"
                    value={values.provincia}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${
                      errors.provincia ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    {provincias.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
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
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.provincia && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.provincia}
                  </p>
                )}
              </div>
            </div>

            {/* 🟢 CAMBIO: NIVEL AQUÍ (Fila 3) JUNTO A WEB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="nivel"
                >
                  Nivel Educativo
                </label>
                <div className="relative">
                  <select
                    name="nivel"
                    id="nivel"
                    value={values.nivel}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${
                      errors.nivel
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="">Seleccionar Nivel...</option>
                    {niveles.map((nivel) => (
                      <option key={nivel} value={nivel}>
                        {nivel}
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
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.nivel && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.nivel}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="sitio_web"
                >
                  Sitio Web (Opcional)
                </label>
                <input
                  type="text"
                  name="sitio_web"
                  id="sitio_web"
                  value={values.sitio_web}
                  onChange={handleChange}
                  placeholder="https://www.tu-universidad.edu.ar"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: VERIFICACIÓN */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm">
                2
              </span>
              Verificación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Documento */}
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="tipo_documento"
                >
                  Documento de Respaldo
                </label>
                <div className="relative">
                  <select
                    name="tipo_documento"
                    id="tipo_documento"
                    value={values.tipo_documento}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer ${
                      errors.tipo_documento
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="">Seleccione tipo...</option>
                    {tiposDeDocumento.map((tipo) => (
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
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.tipo_documento && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.tipo_documento}
                  </p>
                )}
              </div>

              {/* Adjuntar Archivo */}
              <div>
                <label
                  className="block text-sm font-bold text-gray-700 mb-2"
                  htmlFor="documento_archivo"
                >
                  Subir Archivo (PDF/Imagen)
                </label>
                <input
                  type="file"
                  name="documento_archivo"
                  id="documento_archivo"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className={`w-full p-2.5 bg-white border border-dashed rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 ${
                    errors.documento_archivo
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.documento_archivo && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.documento_archivo}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botón de Submit */}
          <div className="pt-6 text-right border-t border-gray-100">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
            >
              Crear Institución
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ======================================================================================
// ⚠️ MOCKS PARA VISTA PREVIA - ¡¡¡BORRAR ESTA SECCIÓN EN TU PROYECTO!!! ⚠️
// ======================================================================================

// Mock de useForm
const useForm = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (callback, validator) => (e) => {
    e.preventDefault();
    const validationErrors = validator ? validator(values) : {};
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      callback(values);
    }
  };

  return { values, errors, setErrors, setValues, handleChange, handleSubmit };
};

// Mock de universityService
const universityService = {
  createInstitution: async (data) => {
    console.log("Simulando creación de institución con:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
