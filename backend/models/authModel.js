import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";

const Auth = sequelize.define(
  "auth",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "auth",
  }
);

// ✅ Relationship with User
Auth.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
User.hasMany(Auth, {
  foreignKey: "user_id",
});

export default Auth;
