const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Task extends Model {}

// aca creamos propuedades para el modelo
Task.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      defaultValue: "no hay descripcion disponible",
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    miniDescripcion: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          this.getDataValue("descripcion").slice(8) + "lo hice con un virtual"
        ); // esto envia al front un nuevo campo con las caracteristicas que desee y no se guarda en la db
      },
    },
  },
  { sequelize: sequelize, modelName: "task" }
);

// metodo de clase: aplico a todos los elementos de task
//Task.findAll();
Task.findByTitle = function () {
  // lo hace es buescar en todos los archivos un titulo que se llama pepe
  Task.findAll({
    where: {
      titulo: "pepe",
    },
  }).then((tareas) => {
    return tareas; // me va a traer las tareas llamadas pepe
  });
};

// metodos de instancia : aplico a un elemento en  especifico
Task.prototype.findSimilar = function (tarea) {
  // trae elementos similares al que recibo
  Task.findAll({
    where: {
      descripcion: {
        [Sequelize.Op.like]: tarea.descripcion, // apartir de una tarea me puedo trae a tareas similares que contegan en la descripcion el titulo de la tarea
      },
    },
  }).then((tareas) => {
    return tareas;
  });
};
module.exports = Task;
