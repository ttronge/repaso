const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}

// aca creamos propuedades para el modelo
User.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, // lo hace obligatorio al campo
    },
    apellido: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },

    secretCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // mediante un HOOK voy a crear automaticamente esta info. la creo yo y no el user
    },
  },
  { sequelize: sequelize, modelName: "user" }
);
// agrego un HOOK before validate y voy asignarle un codigo secreto a cada elemento creado
User.addHook("beforeValidate", (user, options) => {
  user.secretCode = parseInt(Math.random() * 100);
});
module.exports = User;
