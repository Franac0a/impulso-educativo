// src/pages/CareerListPage.jsx
import React, { useState, useEffect } from "react";
import { careersService } from "../services/careers.service";
import { useForm } from "../hooks/useForm";

// ⚠️ CAMBIO: Exportamos como una constante nombrada
export const CareerListPage = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { values, handleChange } = useForm({
    search: "",
  });

  // ... (El resto del código de la función es el mismo)
  const fetchCareers = async (filters) => {
    setLoading(true);
    try {
      const data = await careersService.getAllPublic(filters);
      setCarreras(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las carreras. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCareers(values);
  };

  return (
    // ... (El contenido JSX es el mismo)
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">{/* ...etc... */}</div>
  );
};
