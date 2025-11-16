import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
// ⚠️ CAMBIO: Ya no necesitamos authService aquí
// import { authService } from '../services/auth.service';

// ... (validateRegister se mantiene igual)
const validateRegister = (values) => {
  const errors = {};
  if (!values.name) errors.name = "El nombre de la institución es requerido";
  if (!values.email) errors.email = "El email de contacto es requerido";
  if (!values.password) errors.password = "La contraseña es requerida";
  if (values.password.length < 6)
    errors.password = "Debe tener al menos 6 caracteres";
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Las contraseñas no coinciden";
  return errors;
};

export const RegisterUniversityForm = () => {
  // ⚠️ CAMBIO: Sacamos 'login' y traemos 'register'
  const { register, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({
    name: "", // Este es el 'name' de la institución
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Si ya está logueado, al dashboard
    }
  }, [isAuthenticated, navigate]);

  // ⚠️ CAMBIO: El 'handleRegister' ahora es mucho más simple
  const handleRegister = async (formData) => {
    try {
      // 1. Preparamos los datos
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: "universidad", // Hardcodeamos el tipo
      };

      // 2. Llamamos a la función 'register' del CONTEXTO
      await register(dataToSend);
    } catch (error) {
      setErrors({ api: error.message || "Error en el registro." });
    }
  };

  const onSubmit = handleSubmit(handleRegister, validateRegister);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Registrar Institución
      </h2>

      {errors.api && (
        <p className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm text-center">
          {errors.api}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre de la Institución
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email de Contacto
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Registrar Institución
          </button>
          <Link
            to="/login"
            className="text-center text-sm text-indigo-600 hover:underline"
          >
            ¿Ya tenés cuenta? Iniciar Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};
