// const express = require("express");
// const router = express.Router();
// const controllers = require("../controllers");
// router.get("/api/v1/cars", controllers.cars.getCars);
// router.post("/api/v1/cars", controllers.cars.createCar);
// router.get("/api/v1/cars/:id", controllers.cars.getCarById);
// router.put("/api/v1/cars/:id", controllers.cars.updateCar);
// router.delete("/api/v1/cars/:id", controllers.cars.deleteCar);

// module.exports = router;  (router manual tanpa  midleware)

// const controllers = require("../controllers");

// module.exports = function (app) {
//   app.use("/api/v1/cars", controllers.cars);
//   app.use("/api/v1/users", controllers.users);
//   app.use("/api/v1/auth", controllers.auth);
//   app.use("/api/v1/orders", controllers.order);
//   app.use("/api/v1/upload", controllers.upload);

//   // app.use('/api/v1/cars', controllers.cars);
// };

const { cars, users, auth, order, upload } = require("../controllers");
const path = require("path");
const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../openapi.json");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/cars", cars);
router.use("/users", users);
router.use("/auth", auth);
router.use("/order", order);
router.use("/upload", upload);

module.exports = router;
