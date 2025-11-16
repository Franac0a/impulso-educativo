import React from "react";
import { useForm } from "../hooks/useForm"; // Reutilizamos el hook

// Un hook de formulario vacío por ahora, solo para manejar el estado
const validateContact = (values) => {
  const errors = {};
  if (!values.name) errors.name = "El nombre es requerido";
  if (!values.email) errors.email = "El email es requerido";
  if (!values.message) errors.message = "El mensaje no puede estar vacío";
  return errors;
};

// ⚠️ Usamos export nombrado
export const ContactPage = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    name: "",
    email: "",
    message: "",
  });

  // Por ahora, el submit solo muestra los datos en consola
  const handleContactSubmit = (formData) => {
    console.log("Formulario de contacto enviado:", formData);
    alert("¡Gracias por tu mensaje!");
    // Aquí iría la lógica para enviarlo a un backend o servicio
  };

  const onSubmit = handleSubmit(handleContactSubmit, validateContact);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Título y Subtítulo */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-teal-600">Contacto</h1>
          <p className="text-lg text-gray-600 mt-2">
            ¿Tenés dudas, sugerencias o querés más información? ¡Estamos para
            ayudarte!
          </p>
        </div>

        {/* Contenedor de la Card */}
        <div className="bg-white rounded-xl shadow-xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Columna Izquierda: Formulario */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Envíanos un mensaje
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Campo Nombre */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={`shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Campo Email */}
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
                  placeholder="tu@email.com"
                  className={`shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Mensaje */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Escribí tu mensaje..."
                  className={`shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Botón Enviar */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition"
              >
                Enviar
                {/* Ícono de Enviar (SVG) */}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.853a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11.69l3.766-2.26a.5.5 0 01.668.45l-.9 4.5a1 1 0 001.065.98l5-1.429a1 1 0 00.5-1.85l-14-7z"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Columna Derecha: Información */}
          <div className="bg-teal-50 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Información de Contacto
            </h2>
            <ul className="space-y-6">
              {/* Email */}
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                  <a
                    href="mailto:contacto@impulsoeducativo.com"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    contacto@impulsoeducativo.com
                  </a>
                </div>
              </li>
              {/* Teléfono */}
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.031 11.031 0 004.816 4.816l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Teléfono
                  </h3>
                  <span className="text-gray-600">+54 370 400 1234</span>
                </div>
              </li>
              {/* Dirección */}
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Dirección
                  </h3>
                  <span className="text-gray-600">
                    Formosa Capital, Argentina
                  </span>
                </div>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Redes Sociales
              </h3>
              <div className="flex space-x-4">
                {/* (Faltan los SVGs de redes, los ponemos en el footer) */}
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  Facebook
                </a>
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  Twitter
                </a>
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
