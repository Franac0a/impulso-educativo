// src/pages/LoginPage.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

const validateLogin = (values) => {
  // ... (función de validación)
  const errors = {};
  if (!values.email) errors.email = "El email es requerido";
  if (!values.password) errors.password = "La contraseña es requerida";
  return errors;
};

// ⚠️ CAMBIO: Exportamos como una constante nombrada
export const LoginPage = () => {
  const { login, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  // ... (El resto del código de la función es el mismo)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(userType === "universidad" ? "/dashboard" : "/");
    }
  }, [isAuthenticated, navigate, userType]);

  const handleLogin = async (formData) => {
    await login(formData.email, formData.password);
  };

  const onSubmit = handleSubmit(handleLogin, validateLogin);

  return (
    // ... (El contenido JSX es el mismo)
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* ...etc... */}
    </div>
  );
};
