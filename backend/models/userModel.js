import sequelize from "../config/db.js";
import {DataTypes} from 'sequelize';

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: null
    },
    role:{
        type:DataTypes.ENUM('admin', 'user'),
        default: 'user',
    }
      
}, {
    tableName: 'user',
    timestamps: true
  });
  

export default User