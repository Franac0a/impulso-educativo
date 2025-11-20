import React, { useState } from "react";
import { useNavigate } from "react-router";

// 👇👇👇 ¡¡IMPORTANTE: DESCOMENTA ESTAS 2 LÍNEAS EN TU PROYECTO!! 👇👇👇
import questions from "../data/questions.js";
import { saveVocationalResult } from "../services/user.service.js";

export const VocationalTestPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalProfile, setFinalProfile] = useState([]);

  const totalQuestions = questions?.length || 0;

  // --- LÓGICA DEL TEST ---
  const calculateRIASECProfile = (answers) => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    answers.forEach((code) => {
      if (scores[code] !== undefined) scores[code]++;
    });
    const sortedEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sortedEntries.slice(0, 3).map(([key]) => key);
  };

  const handleAnswer = async (val) => {
    const updatedAnswers = [...selectedAnswers, val];
    setSelectedAnswers(updatedAnswers);

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest(updatedAnswers);
    }
  };

  const finishTest = async (finalAnswers) => {
    setLoading(true);
    const profileArray = calculateRIASECProfile(finalAnswers);
    const profileString = profileArray.join("");

    try {
      await saveVocationalResult(profileString);
      setFinalProfile(profileArray);
      setShowResultModal(true);
    } catch (error) {
      console.error("Error al guardar:", error);
      setFinalProfile(profileArray);
      setShowResultModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setShowResultModal(false);
  };

  const goToCareers = () => {
    navigate("/carreras");
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Error: No se cargaron las preguntas.
      </div>
    );
  }

  const progressPercent = Math.round(
    ((currentQuestion + 1) / totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* --- COLUMNA IZQUIERDA: EL TEST COMPACTO --- */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-5 md:p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-teal-700">
                Descubrí tu Vocación
              </h2>
              <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                {currentQuestion + 1} / {totalQuestions}
              </span>
            </div>

            {/* Barra de Progreso Fina */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Pregunta */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-tight min-h-[3rem] flex items-center">
                {questions[currentQuestion].text}
              </h3>

              {/* GRILLA DE OPCIONES (2 COLUMNAS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    disabled={loading}
                    className="group w-full p-3 text-left rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-150 flex items-center justify-between bg-gray-50/50"
                  >
                    <span className="text-gray-700 text-sm font-medium group-hover:text-teal-900">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botón Reiniciar (Pequeño) */}
            {selectedAnswers.length > 0 && (
              <div className="text-right border-t border-gray-100 pt-3">
                <button
                  onClick={handleRestart}
                  className="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors inline-flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reiniciar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- COLUMNA DERECHA: INFO (Visible en Desktop) --- */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-600 to-teal-600 rounded-xl shadow-md p-6 text-white sticky top-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Tu futuro empieza acá
            </h3>

            <div className="bg-white/10 rounded-lg p-3 border border-white/20 text-sm leading-relaxed">
              <p>
                🚀 <span className="text-yellow-300 font-bold">Recordá:</span>{" "}
                Una vez finalizado el test, dirigite a la sección de
                <span className="font-bold text-white">
                  {" "}
                  "Explorar Ofertas"
                </span>{" "}
                y usá los filtros inteligentes para encontrar tu afinidad ideal.
              </p>
            </div>

            <p className="mt-4 text-xs opacity-75 text-center">
              Metodología RIASEC
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL RESULTADO --- */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-teal-500"></div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                ¡Test Completado!
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 my-4 border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">
                  Tu Perfil
                </p>
                <div className="flex justify-center gap-2">
                  {finalProfile.map((letter, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center justify-center w-8 h-8 rounded bg-teal-600 text-white text-lg font-bold shadow-sm"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={goToCareers}
                  className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors shadow text-sm"
                >
                  🔍 Ver Carreras Compatibles
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full py-2 px-4 bg-white text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Volver a empezar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
