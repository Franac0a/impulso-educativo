import React from "react";

// Íconos SVG para las tarjetas (mejor que imágenes externas)
const TargetIcon = () => (
  <svg
    className="w-12 h-12 text-teal-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 18.5A6.5 6.5 0 1118.5 12 6.5 6.5 0 0112 18.5z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 13.5A1.5 1.5 0 1113.5 12 1.5 1.5 0 0112 13.5z"
    ></path>
  </svg>
);
const EyeIcon = () => (
  <svg
    className="w-12 h-12 text-teal-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);
const HeartIcon = () => (
  <svg
    className="w-12 h-12 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z"
    ></path>
  </svg>
);

export const AboutSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Título Principal */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Impulso Educativo nació con la misión de acompañar a estudiantes y
            profesionales en la elección de su camino académico y laboral.
          </p>
        </div>

        {/* Sección 1: La Problemática (La mejora que pediste) */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="px-6">
            <h3 className="text-3xl font-bold text-teal-700 mb-4">
              El Desafío en Formosa
            </h3>
            <p className="text-gray-700 text-lg mb-4">
              Encontrar información sobre carreras en Formosa puede ser una
              odisea. Los datos están dispersos, desactualizados o son difíciles
              de comparar.
            </p>
            <p className="text-gray-700 text-lg">
              Esta fragmentación genera incertidumbre y dificulta una de las
              decisiones más importantes de la vida. ¿Cuántos talentos se
              pierden por no saber que existía una carrera ideal para ellos a la
              vuelta de la esquina?
            </p>
          </div>
          <div>
            {/* ⚠️ Reemplazá esto por una foto tuya si querés, o dejá la de placeholder */}
            <img
              src="./public/persona_frustrada.jpg"
              alt="Estudiantes buscando información"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Sección 2: Misión, Visión y Valores (Tu Mockup) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card: Misión */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
            <div className="bg-teal-100 rounded-full p-4">
              <TargetIcon />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              Nuestra Misión
            </h3>
            <p className="text-gray-600">
              Brindar información confiable, recursos vocacionales y
              herramientas digitales para reducir la incertidumbre al elegir una
              carrera.
            </p>
          </div>

          {/* Card: Visión */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
            <div className="bg-teal-100 rounded-full p-4">
              <EyeIcon />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              Nuestra Visión
            </h3>
            <p className="text-gray-600">
              Convertirnos en la plataforma de referencia en orientación
              educativa de Formosa, apoyando a miles de jóvenes y adultos.
            </p>
          </div>

          {/* Card: Valores */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
            <div className="bg-yellow-100 rounded-full p-4">
              <HeartIcon />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              Nuestros Valores
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Compromiso con la
                educación
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Transparencia y
                accesibilidad
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Innovación
                tecnológica
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Acompañamiento
                personalizado
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
