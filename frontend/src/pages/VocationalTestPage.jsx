import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { userService } from "../services/user.service";
import { useAuth } from "../context/AuthContext";

const RIASEC_OPTIONS = ["R", "I", "A", "S", "E", "C"];

export const VocationalTestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si ya hay resultado guardado, mostrarlo
    if (user?.riasecProfile) {
      setSelected(user.riasecProfile.split(""));
    }
  }, [user]);

  const toggleOption = (option) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      } else {
        if (prev.length < 3) {
          return [...prev, option];
        }
        return prev; // Máximo 3 opciones
      }
    });
  };

  const handleSave = async () => {
    if (selected.length === 0) {
      setError("Seleccioná al menos una opción");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await userService.saveVocationalResult(selected.join(""));
      alert("Resultado guardado correctamente!");
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      setError("Error al guardar el resultado. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        Test Vocacional RIASEC
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          Seleccioná tus tres principales intereses o habilidades:
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {RIASEC_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`p-3 rounded-lg border font-semibold ${
                selected.includes(option)
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition"
        >
          {loading ? "Guardando..." : "Guardar Resultado"}
        </button>
      </div>
    </div>
  );
};
