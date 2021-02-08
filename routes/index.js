const express = require("express");
const router = express.Router(); // es un obj router que tiene todas las rutas declaradas en este archibo u otro

//importar rutas
const userRoutes = require("./user"); // aca estoy llamando al archivo user
const taskRoutes = require("./task"); //   //   // / / / / / /       task

router.get("/", (req, res, next) => {
  res.send("entre");
});

router.use("/user", userRoutes); // aca mando al usuario al archivo user
router.use("/task", taskRoutes); // aca mando al usuario al archivo task

module.exports = router; // exporta todas las rutas
