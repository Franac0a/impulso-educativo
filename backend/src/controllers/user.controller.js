import { UserModel } from "../models/user.model.js";

// Obtener perfil del usuario logueado
export const obtenerPerfil = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const usuario = await UserModel.findByPk(userId, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (!usuario)
      return res
        .status(404)
        .json({ error: "Perfil de usuario no encontrado." });

    return res.status(200).json({
      mensaje: "Datos de perfil obtenidos correctamente",
      perfil: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        type: usuario.type,
        riasecProfile: usuario.riasecProfile,
      },
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

// Listar todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar usuarios.", error });
  }
};

// Guardar resultado vocacional RIASEC
export const saveVocationalResult = async (req, res) => {
  const userId = req.usuario.id;
  const { riasecProfile } = req.body;

  if (
    !riasecProfile ||
    (riasecProfile.length !== 3 && riasecProfile.length !== 0)
  ) {
    return res
      .status(400)
      .json({ message: "Formato de perfil RIASEC inválido." });
  }

  try {
    const user = await UserModel.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado." });

    user.riasecProfile = riasecProfile.toUpperCase();
    await user.save();

    res.status(200).json({
      message: "Resultado vocacional guardado exitosamente.",
      riasecProfile: user.riasecProfile,
    });
  } catch (error) {
    console.error("Error al guardar resultado vocacional:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};
