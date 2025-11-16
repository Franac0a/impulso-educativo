import { Router, Route } from "react-router";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";

export const AppRouter = () => {
  return (
    <Router>
      <Route path="/" element={<h1>Inicio</h1>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Router>
  );
};
