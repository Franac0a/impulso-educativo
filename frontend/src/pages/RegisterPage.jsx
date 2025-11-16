import React, { useState } from "react";

// Importamos los dos formularios que acabamos de crear
import { RegisterStudentForm } from "../components/RegisterStudentForm";
import { RegisterUniversityForm } from "../components/RegisterUniversityForm";

// ⚠️ Usamos export nombrado
export const RegisterPage = () => {
  // Estado para saber qué formulario mostrar: 'student' o 'university'
  const [formType, setFormType] = useState("student");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden my-12">
        {/* --- COLUMNA IZQUIERDA (Info + Imágenes) --- */}
        <div className="bg-indigo-700 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Encontrá tu camino</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Descubrí la vocación que te define y el futuro que te espera.
          </p>

          {/* ⚠️ REEMPLAZÁ ESTOS NOMBRES por los de tus imágenes en /public */}
          <ul className="space-y-6">
            <li className="flex items-center">
              {/* Asumo que tenés una imagen 'birrete.svg' en tu carpeta /public */}
              <img
                src="/birrete.svg"
                alt="Test Vocacional"
                className="w-10 h-10 mr-4 bg-white rounded-full p-2"
              />
              <span className="text-xl">Realizá Tests Vocacionales</span>
            </li>
            <li className="flex items-center">
              <img
                src="/lupa.svg"
                alt="Explorá"
                className="w-10 h-10 mr-4 bg-white rounded-full p-2"
              />
              <span className="text-xl">Explorá carreras y universidades</span>
            </li>
            <li className="flex items-center">
              <img
                src="/cohete.svg"
                alt="Inscribite"
                className="w-10 h-10 mr-4 bg-white rounded-full p-2"
              />
              <span className="text-xl">Inscribite a tu futuro</span>
            </li>
          </ul>
        </div>

        {/* --- COLUMNA DERECHA (Formulario) --- */}
        <div className="p-8 md:p-12 relative">
          {/* Aquí renderizamos el formulario correspondiente */}
          {formType === "student" ? (
            <RegisterStudentForm />
          ) : (
            <RegisterUniversityForm />
          )}

          {/* --- El "Switch" (Botón para cambiar) --- */}
          <div className="mt-8 text-center">
            <button
              onClick={() =>
                setFormType(formType === "student" ? "university" : "student")
              }
              className="text-gray-600 font-semibold hover:text-indigo-700 transition"
            >
              {formType === "student"
                ? "¿Eres una Institución Educativa? Regístrate Aquí"
                : "¿Eres un Estudiante? Regístrate Aquí"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
