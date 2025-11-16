import React, { useEffect } from "react";
// ⚠️ Importamos de 'react-router'
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

// La lógica de validación, hooks, y submit no cambia en absoluto
const validateLogin = (values) => {
  const errors = {};
  if (!values.email) errors.email = "El email es requerido";
  if (!values.password) errors.password = "La contraseña es requerida";
  return errors;
};

export const LoginPage = () => {
  const { login, isAuthenticated, loading, userType } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      navigate(userType === "universidad" ? "/dashboard" : "/");
    }
  }, [isAuthenticated, loading, navigate, userType]);

  const handleLogin = async (formData) => {
    await login(formData.email, formData.password);
  };

  const onSubmit = handleSubmit(handleLogin, validateLogin);

  // --- ⚠️ A PARTIR DE AQUÍ COMIENZA EL NUEVO DISEÑO ---
  return (
    // Fondo general de la página (un verde muy claro)
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center p-4">
      {/* La Card Principal */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        {/* 1. Encabezado Verde Degradado */}
        <div className="bg-gradient-to-b from-teal-500 to-green-600 p-8 text-white text-center">
          {/* Logo (Placeholder) */}
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center p-2 shadow-inner">
            {/* Asumo que tenés un logo en /public/logo.svg */}
            <img
              src="/logo.svg"
              alt="Logo Impulso Educativo"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <h1 className="text-2xl font-bold mt-4">Impulso Educativo</h1>
          <p className="text-green-100">Bienvenido de vuelta</p>
        </div>

        {/* 2. Cuerpo del Formulario (Blanco) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Accede a tu cuenta para continuar
          </p>

          {/* Mostrar error de la API */}
          {errors.api && (
            <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
              {errors.api}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Campo Email con Ícono */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <div className="relative">
                {/* Ícono de Email (SVG) */}
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
                  placeholder="tu@email.com"
                  className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo Contraseña con Ícono */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                {/* Ícono de Candado (SVG) */}
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
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`pl-10 shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {/* (Falta el ícono del ojo para "mostrar contraseña", lo podemos añadir después) */}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Opciones (Recordarme / Olvidaste) */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                Recordarme
              </label>
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition"
            >
              Iniciar Sesión
              {/* Ícono de Flecha (SVG) */}
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </form>

          {/* "O continúa con" (Social Logins - Opcional) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  O continúa con
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                {/* (Ícono de Google) */}
                Google
              </button>
              <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                {/* (Ícono de Microsoft) */}
                Microsoft
              </button>
            </div>
          </div>

          {/* Link a Registro */}
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* 3. Footer de la Card (Switch a Institución) */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <Link
            to="/register"
            className="flex items-center justify-center text-gray-700 hover:text-teal-600 transition"
          >
            {/* Ícono de Institución (SVG) */}
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4h5m0 0v-4m0 4h5M5 12h14M5 8h14"
              ></path>
            </svg>
            <span className="font-semibold">
              ¿Eres una institución educativa?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
