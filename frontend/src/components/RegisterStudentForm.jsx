import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

const validateRegister = (values) => {
  const errors = {};
  if (!values.firstName) errors.firstName = "El nombre es requerido";
  if (!values.lastName) errors.lastName = "El apellido es requerido";
  if (!values.email) errors.email = "El email es requerido";
  if (!values.password) errors.password = "La contraseña es requerida";
  if (values.password.length < 6)
    errors.password = "Debe tener al menos 6 caracteres";
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Las contraseñas no coinciden";
  return errors;
};

export const RegisterStudentForm = () => {
  const { register, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(userType === "universidad" ? "/dashboard" : "/");
    }
  }, [isAuthenticated, navigate, userType]);

  const handleRegister = async (formData) => {
    try {
      const dataToSend = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        type: "estudiante",
      };

      await register(dataToSend);
    } catch (error) {
      setErrors({ api: error.message || "Error en el registro." });
    }
  };

  const onSubmit = handleSubmit(handleRegister, validateRegister);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Crear cuenta de Estudiante
      </h2>

      {errors.api && (
        <p className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm text-center">
          {errors.api}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={values.firstName}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Crear cuenta
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
