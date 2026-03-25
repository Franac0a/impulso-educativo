import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

export const RegisterUniversityForm = () => {
  const { register, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    terms: false,
  });

  const validateRegister = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = "El nombre es requerido";
    if (!values.lastName) errors.lastName = "El apellido es requerido";
    if (!values.email) errors.email = "El email es requerido";
    if (!values.password) errors.password = "La contraseña es requerida";
    if (values.password.length < 8) errors.password = "Mínimo 8 caracteres";
    if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";

    if (!values.terms) errors.terms = "Debe aceptar los términos y condiciones";
    return errors;
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (formData) => {
    try {
      const dataToSend = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        type: "universidad",
      };

      await register(dataToSend);
    } catch (error) {
      setErrors({ api: error.message || "Error en el registro." });
    }
  };

  const onSubmit = handleSubmit(handleRegister, validateRegister);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2 text-center text-teal-700">
        Crear Cuenta de Institución
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Complete los datos del responsable de la cuenta.
      </p>

      {errors.api && (
        <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          {errors.api}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Fila Nombre y Apellido */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Nombre (responsable) */}
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Nombre (del responsable)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          {/* Apellido (responsable) */}
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Apellido (del responsable)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
                className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico (laboral)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Mínimo 8 caracteres con números y letras.
          </p>
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
            Confirmar contraseña
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              className="mr-2 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            Acepto los términos y condiciones
          </label>
          {errors.terms && (
            <p className="text-red-500 text-xs italic mt-1">{errors.terms}</p>
          )}
        </div>

        {/* Botón de Submit */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              ></path>
            </svg>
            Crear cuenta de institución
          </button>

          <Link
            to="/login"
            className="text-center text-sm text-indigo-600 hover:underline"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
};
