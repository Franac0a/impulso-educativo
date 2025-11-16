import { useState } from "react";

// ⚠️ Usamos export nombrado
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Limpia el error del campo cuando se edita
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit =
    (callback, validateFn = () => ({})) =>
    async (event) => {
      event.preventDefault();

      const validationErrors = validateFn(values);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        // Llama a la función de login/register
        await callback(values);
      } catch (error) {
        // Guarda un error general de la API
        // (Asumiendo que el error de la API tiene un .message o .mensaje)
        const apiError =
          error.mensaje || error.message || "Ocurrió un error en el servidor.";
        setErrors({ api: apiError });
      }
    };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors, // ⚠️ Añadimos 'setErrors' para que el register lo pueda usar
  };
};
