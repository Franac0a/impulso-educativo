import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { careerService } from "../services/career.service";

// Validación
const validateEditCareer = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.nivel) errors.nivel = "El nivel es requerido";
  if (!values.duracion) errors.duracion = "La duración es requerida";
  if (!values.campo) errors.campo = "El campo es requerido";
  return errors;
};

export const EditCareerPage = () => {
  const { id } = useParams(); // ID de la carrera
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const { values, errors, setValues, setErrors, handleChange, handleSubmit } =
    useForm({
      nombre: "",
      nivel: "",
      duracion: "",
      campo: "",
      descripcion: "",
    });

  // 1. Cargar datos de la carrera
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await careerService.getById(id);
        // El backend devuelve directamente la carrera (no envuelve en { carrera: ... })
        const c = res?.carrera ?? res;

        if (!c || !c.id) {
          // Si la respuesta no tiene la estructura esperada, redirigimos
          return navigate("/dashboard/mis-carreras");
        }

        setValues({
          nombre: c.nombre || "",
          nivel: c.nivel || "",
          duracion: c.duracion || "",
          campo: c.campo || "",
          descripcion: c.descripcion || "",
        });
      } catch (error) {
        // Si la API devuelve 404 o hay otro error, volvemos a la lista
        navigate("/dashboard/mis-carreras");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id, navigate, setValues]);

  // 2. Enviar actualización
  const handleUpdateCareer = async (formValues) => {
    try {
      await careerService.update(id, formValues);

      setSuccessMessage("Carrera actualizada con éxito.");
      // Mostrar el mensaje brevemente y redirigir a Mis Carreras
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/dashboard/mis-carreras");
      }, 900);
    } catch (err) {
      const msg =
        err?.response?.data?.mensaje || "Error al actualizar la carrera.";
      setErrors({ api: msg });
    }
  };

  const onSubmit = handleSubmit(handleUpdateCareer, validateEditCareer);

  if (loading) return <p className="p-4">Cargando datos...</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Editar Carrera
        </h1>
        <p className="text-gray-600 mb-6">
          Modifica los datos de esta carrera.
        </p>

        {/* Mensajes */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        {errors.api && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {errors.api}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs">{errors.nombre}</p>
            )}
          </div>

          {/* Nivel */}
          <div>
            <label className="block text-sm font-bold mb-2">Nivel</label>
            <select
              name="nivel"
              value={values.nivel}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3"
            >
              <option value="">Seleccionar...</option>
              <option value="Tecnicatura">Tecnicatura</option>
              <option value="Pregrado">Pregrado</option>
              <option value="Grado">Grado</option>
              <option value="Posgrado">Posgrado</option>
            </select>
            {errors.nivel && (
              <p className="text-red-500 text-xs">{errors.nivel}</p>
            )}
          </div>

          {/* Duración */}
          <div>
            <label className="block text-sm font-bold mb-2">Duración</label>
            <input
              type="text"
              name="duracion"
              value={values.duracion}
              onChange={handleChange}
              placeholder="Ej: 3 años"
              className="shadow border rounded w-full py-2 px-3"
            />
            {errors.duracion && (
              <p className="text-red-500 text-xs">{errors.duracion}</p>
            )}
          </div>

          {/* Campo */}
          <div>
            <label className="block text-sm font-bold mb-2">Campo</label>
            <input
              type="text"
              name="campo"
              value={values.campo}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3"
            />
            {errors.campo && (
              <p className="text-red-500 text-xs">{errors.campo}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold mb-2">
              Descripción (opcional)
            </label>
            <textarea
              name="descripcion"
              value={values.descripcion}
              onChange={handleChange}
              rows={4}
              className="shadow border rounded w-full py-2 px-3"
            />
          </div>

          {/* Botón */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
