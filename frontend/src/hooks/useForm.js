import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

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
        await callback(values);
      } catch (error) {
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
    setValues, // <-- agregado
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
