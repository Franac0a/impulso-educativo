import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { universityService } from "../services/university.service";

// Opciones para los <select>
const tiposDeGestion = ["Pública", "Privada"];
const provincias = ["Formosa", "Chaco", "Corrientes", "Misiones"];
const tiposDeDocumento = [
  "Estatuto de la Institución",
  "Habilitación Ministerial",
  "Otro",
];

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
  return errors;
};

export const CreateInstitutionPage = () => {
  const navigate = useNavigate();
  const niveles = ["Terciario", "Universitario", "Tecnicatura"];

  // ⚠️ ¡CORRECCIÓN EN ESTA LÍNEA! setValues se incluye correctamente.
  const {
    values,
    errors,
    setErrors,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm({
    nombre: "",
    alias: "",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "",
    tipo_documento: "",
    documento_archivo: null, // Aquí guardaremos el archivo
    nivel: "",
  });

  // handleFileChange usa setValues para guardar el archivo
  // La línea 55 que te daba error está aquí:
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // ✅ setValues ahora está definido y funciona
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
      const data = new FormData();

      // Campos de texto
      data.append("nombre", formData.nombre);
      data.append("alias", formData.alias);
      data.append("tipo_gestion", formData.tipo_gestion);
      data.append("provincia", formData.provincia);
      data.append("sitio_web", formData.sitio_web || ""); // por si está vacío
      data.append("tipo_documento", formData.tipo_documento);
      data.append("nivel", formData.nivel || ""); // opcional

      // Archivo
      if (formData.documento_archivo) {
        data.append("documento_verificacion", formData.documento_archivo);
      }

      await universityService.createInstitution(data);

      // Redirigimos al Dashboard después de crear el perfil
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

  // --- Renderizado (Diseño) ---
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Crear Institución
        </h1>
        <p className="text-gray-600 mb-6">
          Completa los datos públicos de tu institución y adjunta la
          documentación de respaldo.
        </p>

        {errors.api && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {errors.api}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="nombre"
              >
                Nombre Oficial de la Institución
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

            {/* Alias */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="alias"
              >
                Alias (Ej: UNaF, UTN, IPF)
              </label>
              <input
                type="text"
                name="alias"
                id="alias"
                value={values.alias}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Gestión */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="tipo_gestion"
              >
                Tipo de Gestión
              </label>
              <select
                name="tipo_gestion"
                id="tipo_gestion"
                value={values.tipo_gestion}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.tipo_gestion ? "border-red-500" : "border-gray-300"
                }`}
              >
                {tiposDeGestion.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
              {errors.tipo_gestion && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.tipo_gestion}
                </p>
              )}
            </div>

            {/* Provincia */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="provincia"
              >
                Provincia
              </label>
              <select
                name="provincia"
                id="provincia"
                value={values.provincia}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.provincia ? "border-red-500" : "border-gray-300"
                }`}
              >
                {provincias.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
              {errors.provincia && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.provincia}
                </p>
              )}
            </div>
          </div>

          {/* Sitio Web */}
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
              className="shadow border rounded w-full py-2 px-3 text-gray-700 border-gray-300"
            />
          </div>

          {/* --- CAMPOS DE VERIFICACIÓN --- */}

          {/* Tipo de Documento */}
          <div>
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="tipo_documento"
            >
              Tipo de Documento de Verificación
            </label>
            <select
              name="tipo_documento"
              id="tipo_documento"
              value={values.tipo_documento}
              onChange={handleChange}
              className={`shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                errors.tipo_documento ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un tipo de documento...</option>
              {tiposDeDocumento.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            {errors.tipo_documento && (
              <p className="text-red-500 text-xs italic mt-1">
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
              Adjuntar Documento (PDF, PNG, JPG)
            </label>
            <input
              type="file"
              name="documento_archivo"
              id="documento_archivo"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className={`shadow-sm appearance-none border rounded w-full py-2.5 px-3 text-gray-700 ${
                errors.documento_archivo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.documento_archivo && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.documento_archivo}
              </p>
            )}
          </div>

          {/* Nivel */}
          <div>
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="nivel"
            >
              Nivel
            </label>
            <select
              name="nivel"
              id="nivel"
              value={values.nivel}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                errors.nivel ? "border-red-500" : "border-gray-300"
              }`}
            >
              {niveles.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
            {errors.nivel && (
              <p className="text-red-500 text-xs italic mt-1">{errors.nivel}</p>
            )}
          </div>

          {/* Botón de Submit */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Guardar Perfil y Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
