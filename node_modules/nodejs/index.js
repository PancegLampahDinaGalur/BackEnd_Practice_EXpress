require("dotenv").config();
const express = require("express");
const http = require("http");
const PORT = 3000;
//const routes = require("./src/routes");

const app = express();
const server = http.createServer(app);
const errorHandler = require("./src/middlewares/errorHandler");

//registrasi error handler secara global
require("./src/helpers/errors");

app.use(express.json());

require("./src/routes")(app);

// app.use(express.json()); // Sebagai middleware untuk mengubah req.body menjadi JSON
// app.use(routes);


app.use((req, res) => {
    res.status(404).send("Sorry, Page Not Found");
});

// REGISTER HANDLE ERROR
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});