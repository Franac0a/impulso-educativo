// src/pages/VocationalTestPage.jsx
import { useState, useEffect } from "react";
import questions from "../data/questions.js";
import { saveVocationalResult } from "../services/user.service.js";

export const VocationalTestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalQuestions = questions.length;

  // Función para calcular las 3 letras principales del perfil RIASEC
  const calculateRIASECProfile = (answers) => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    answers.forEach((code) => {
      if (scores[code] !== undefined) scores[code]++;
    });
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => key)
      .join("");
  };

  const handleAnswer = async (code) => {
    const updatedAnswers = [...selectedAnswers, code];
    setSelectedAnswers(updatedAnswers);

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Fin del test
      const profile = calculateRIASECProfile(updatedAnswers);
      setLoading(true);
      try {
        await saveVocationalResult(profile);
        alert(`Test completado. Tu perfil RIASEC es: ${profile}`);
      } catch (error) {
        console.error("Error guardando el resultado vocacional:", error);
        alert("Ocurrió un error al guardar tu resultado.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
  };

  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Test de Intereses Vocacionales</h2>

      <div style={{ margin: "20px 0" }}>
        <div
          style={{
            background: "#e0e0e0",
            height: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              background: "#4caf50",
              height: "100%",
              transition: "width 0.3s",
            }}
          ></div>
        </div>
        <p>
          Pregunta {currentQuestion + 1} / {totalQuestions}
        </p>
      </div>

      <h3>{questions[currentQuestion].text}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.code)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {option.text}
          </button>
        ))}
      </div>

      {selectedAnswers.length > 0 && (
        <button
          onClick={handleRestart}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: "#f44336",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Reiniciar Test
        </button>
      )}
    </div>
  );
};
