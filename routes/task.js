const express = require("express");

const router = express.Router();
const { Task } = require("../models/");
// ruta de prueba (usuarios)
router.get("/", (req, res, next) => {
  Task.findAll()
    .then((tareas) => {
      res.status(200).json(tareas);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  const body = req.body;
  Task.create(body)
    .then((tareaCreada) => {
      res.status(201).json(tareaCreada);
    })
    .catch(next);
});

// PUT: modifica un elemento de la base de datos
router.put("/:id", (req, res, next) => {
  const identida = req.params.id;
  const body = req.body;

  Task.update(body, {
    where: {
      id: identida, // ubicar al elemento a acutlizaar
    },
    returning: true,
  })
    .then((tareaActualizada) => {
      // si devuelve 0 esta todo bien cambiando y si da 1 al horno con fritas
      res.status(200).json(tareaActualizada[1][0]);
    })
    .catch(next);
});

// DELETE
router.delete("/:id", (req, res, next) => {
  const tareaId = res.params.id;

  Task.destroy({
    where: {
      id: tareaId,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(next);
});
module.exports = router;
