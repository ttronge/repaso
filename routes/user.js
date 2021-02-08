const express = require("express");
const router = express.Router();
// requerir nuestro modelo creado
const { User } = require("../models/index"); // va entre llaves para que me traiga espeficamente a user del index

// GET: para mostraer todos los usuarios que hay
router.get("/", (req, res, next) => {
  User.findAll({
    /* where: {
      nombre: "Tomas",  estas lineas de codigo son ejemplo de queries donde le pido a la db un key (name) que su value sea "Tomas", entonces solo mandara ese
    },
    */
  }) // el find all va a traernos todas las coincendias de la db
    .then((usuario) => {
      res.status(200).json(usuario);
    })
    .catch(next);
});

//GET

router.get("/:id", (req, res, next) => {
  const userId = req.params.id; // el id va porque es elemento que va despues de los :

  User.findByPk(userId)
    .then((usuario) => {
      if (!usuario) return res.status(404).send("no esta mostro`");
      res.status(200).json(usuario);
    })
    .catch(next);
});

//POST: crear un user
router.post("/", (req, res, next) => {
  const body = req.body; // es la info deonde me llega del front o postman
  User.create(body)
    .then((usuarioCreado) => {
      res.status(201).json(usuarioCreado); // el json es para mandar el obj. json === send
    })
    .catch(next); // fallamos al crear el user
});

module.exports = router;
