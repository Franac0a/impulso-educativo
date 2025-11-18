import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { universityService } from "../services/university.service";

// Opciones para los <select> (iguales a las de CreateInstitutionPage)
const tiposDeGestion = ["Pública", "Privada"];
const provincias = ["Formosa", "Chaco", "Corrientes", "Misiones"];

// Validación (Solo validamos campos necesarios)
const validateEditInstitution = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.tipo_gestion)
    errors.tipo_gestion = "El tipo de gestión es requerido";
  if (!values.provincia) errors.provincia = "La provincia es requerida";
  return errors;
};

export const EditInstitutionPage = () => {
  const navigate = useNavigate();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  // ⚠️ Nota: No incluimos los campos de archivo/verificación aquí,
  // ya que solo se editan los datos públicos (nombre, alias, etc.)

  const { values, errors, setErrors, setValues, handleChange, handleSubmit } =
    useForm({
      nombre: "",
      alias: "",
      tipo_gestion: "Pública",
      provincia: "Formosa",
      sitio_web: "",
      // No necesitamos tipo_documento o archivo aquí
    });

  // 1. Cargar los datos actuales de la institución al montar
  useEffect(() => {
    const fetchInstitutionData = async () => {
      try {
        const response = await universityService.getMyInstitution();
        const institutionData = response.institucion;

        // ⚠️ Rellenar el formulario (setValues de useForm)
        setValues({
          nombre: institutionData.nombre || "",
          alias: institutionData.alias || "",
          tipo_gestion: institutionData.tipo_gestion || "Pública",
          provincia: institutionData.provincia || "Formosa",
          sitio_web: institutionData.sitio_web || "",
        });
      } catch (err) {
        // Si no se encuentra el perfil, redirigimos a crear uno
        navigate("/dashboard/crear-perfil");
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchInstitutionData();
  }, [navigate, setValues]);

  // 2. Función de Submit para ACTUALIZAR (PUT)
  const handleUpdateProfile = async (formData) => {
    try {
      // Llamamos al servicio de actualización (PUT)
      await universityService.updateMyInstitution(formData);

      setSuccessMessage("Perfil actualizado exitosamente.");
      // Limpiamos el mensaje de éxito después de 4 segundos
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.mensaje ||
        err.message ||
        "Error al actualizar el perfil.";
      setErrors({ api: errorMessage });
    }
  };

  const onSubmit = handleSubmit(handleUpdateProfile, validateEditInstitution);

  // --- Renderizado ---

  if (loadingInitial) {
    return (
      <div className="p-8 text-center text-gray-600">
        Cargando datos de la institución...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Editar Perfil Público
        </h1>
        <p className="text-gray-600 mb-6">
          Modifica el nombre, alias o sitio web que aparece en el explorador de
          carreras.
        </p>

        {/* Mensajes de Estado */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
            {successMessage}
          </div>
        )}
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

          {/* Botón de Submit */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
