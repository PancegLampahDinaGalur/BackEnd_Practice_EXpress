require("dotenv").config();
const express = require("express");
const http = require("http");
const PORT = 3000;
//const routes = require("./src/routes");
const path = require("path");
const app = express();
const server = http.createServer(app);
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openApi.json");

//registrasi error handler secara global
require("./src/helpers/errors");

// menambahkan cors supaya bisa diakses dari luar
app.use(cors());

app.use(express.json());

app.use("/public", express.static(path.resolve(__dirname, "public")));

// supaya bisa nempel ke swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./src/routes")(app);

// app.use(express.json()); // Sebagai middleware untuk mengubah req.body menjadi JSON
// app.use(routes);

app.use((req, res) => {
  res.status(404).send("Sorry, Page Not Found");
});

// REGISTER HANDLE ERROR
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
