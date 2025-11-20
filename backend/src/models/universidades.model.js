import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js"; // Asumiendo que este modelo existe

export const UniversidadModel = sequelize.define(
  "Universidad",
  {
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING(50), // ej: "UTN", "UBA"
    },
    tipo_gestion: {
      type: DataTypes.ENUM("Pública", "Privada"),
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sitio_web: {
      type: DataTypes.STRING(255),
    },

    // --- ⚠️ CAMPOS DE VERIFICACIÓN QUE AÑADIMOS ---
    tipo_documento_verificacion: {
      type: DataTypes.STRING,
      allowNull: true, // Lo permite nulo por ahora
    },
    ruta_documento_verificacion: {
      type: DataTypes.STRING,
      allowNull: true, // Lo permite nulo
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto, NO está verificada
      allowNull: false,
    },
    // --- FIN DE CAMPOS AÑADIDOS ---

    // ⚠️ NUEVO CAMPO PARA EL LOGO (Añadido)
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si no suben logo
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 'userId' (la llave foránea) se crea automáticamente por la relación
  },
  {
    timestamps: true,
  }
);

// --- Relaciones ---
// Una Universidad pertenece a un Usuario (el admin que la cargó)
UniversidadModel.belongsTo(UserModel, { foreignKey: "userId" });
UserModel.hasOne(UniversidadModel, { foreignKey: "userId" });
