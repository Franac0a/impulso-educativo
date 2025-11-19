import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const TestResultModel = sequelize.define(
  "TestResult",
  {
    riasec: {
      type: DataTypes.STRING(3),
      allowNull: false,
      comment: "Código RIASEC del test (ej: SAI)",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

// Relaciones
TestResultModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UserModel.hasMany(TestResultModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
