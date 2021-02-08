const express = require("express");
const morgan = require("morgan");

const routes = require("./routes/index");

const { db } = require("./models/index");

const app = express();
// bodyParser (configuracion// middleware)
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", routes);
// error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err);
});
// conectar la base de dataos
db.sync({ force: false })
  .then(() => {
    console.log("db conectada correctamente");
    app.listen(3000, () => {
      console.log("estoy en puerto 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
// nos quedamos en el video 1:44:54 donde mejoramos el enviar el error al user
