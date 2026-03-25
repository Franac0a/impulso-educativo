import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { universityService } from "../services/university.service";

const tiposDeGestion = ["Pública", "Privada"];

const validateProfile = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.tipo_gestion)
    errors.tipo_gestion = "El tipo de gestión es requerido";
  if (!values.provincia) errors.provincia = "La provincia es requerida";
  return errors;
};

export const CreateInstitutionProfilePage = () => {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange, handleSubmit } = useForm({
    nombre: "",
    alias: "",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "",
  });

  const handleCreateProfile = async (formData) => {
    try {
      await universityService.createInstitution(formData);

      alert("¡Perfil de institución creado exitosamente!");

      navigate("/dashboard/crear-carrera");
    } catch (err) {
      setErrors({ api: err.message || "Error al crear el perfil." });
    }
  };

  const onSubmit = handleSubmit(handleCreateProfile, validateProfile);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Crear Perfil de Institución
        </h1>
        <p className="text-gray-600 mb-6">
          Este es el primer paso. Completa los datos de tu institución para
          poder cargar carreras.
        </p>

        {errors.api && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {errors.api}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre de la Institución */}
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
              Alias (ej: UNaF, UTN, IPF)
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
              <input
                type="text"
                name="provincia"
                id="provincia"
                value={values.provincia}
                onChange={handleChange}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.provincia ? "border-red-500" : "border-gray-300"
                }`}
              />
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
              Sitio Web (Opcional, con http://)
            </label>
            <input
              type="url"
              name="sitio_web"
              id="sitio_web"
              placeholder="https://www.ejemplo.com"
              value={values.sitio_web}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 border-gray-300"
            />
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
