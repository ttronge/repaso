// enrutar todos los modelos que creemos , o sea importo

//1) requiero db
const db = require("../db");
// 2) requiero mis modelos
const User = require("./user.model");
const Task = require("./task.model");
// 3) exporto todo
module.exports = {
  db,
  User,
  Task,
};
