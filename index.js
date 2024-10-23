const envPath =
  process.env.NODE_ENV === "development"
    ? ".env"
    : `.env.${process.env.NODE_ENV}`; //.env || .env.test
require("dotenv").config({ path: envPath });
const express = require("express");
const { PORT = 3000 } = process.env;
const path = require("path");
const app = express();
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require("cors");
const routes = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//registrasi error handler secara global
require("./src/helpers/errors");

// menambahkan cors supaya bisa diakses dari luar
app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", async (req, res) => {
  res.status(200).send("Car Rental API");
});

app.use("/api/v1", routes);

//application level middleware untuk error handling
app.use(errorHandler);

app.use((req, res, next) => {
  next(new NotFoundError(null, "Sorry, page not found!"));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

module.exports = server;
