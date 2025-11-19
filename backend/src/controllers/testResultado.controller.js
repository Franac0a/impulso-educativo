import { TestResultModel } from "../models/testResultado.model.js";
import { UserModel } from "../models/user.model.js";

export const guardarResultado = async (req, res) => {
  try {
    const { riasecProfile } = req.body;
    const userId = req.usuario.id;

    if (!riasecProfile || riasecProfile.length !== 3) {
      return res.status(400).json({ error: "Perfil RIASEC inválido" });
    }

    // Guardamos un registro histórico
    const nuevoResultado = await TestResultModel.create({
      riasec: riasecProfile.toUpperCase(),
      userId,
    });

    // Actualizamos el perfil del usuario
    const [updatedRowsCount] = await UserModel.update(
      { riasecProfile: riasecProfile.toUpperCase() },
      { where: { id: userId } }
    );

    return res.status(201).json({
      mensaje: "Resultado RIASEC guardado correctamente",
      riasecProfile: riasecProfile.toUpperCase(),
      resultadoId: nuevoResultado.id,
    });
  } catch (error) {
    console.error("Error al guardar resultado RIASEC:", error);
    return res.status(500).json({
      error: "Error interno del servidor al guardar el resultado",
    });
  }
};
