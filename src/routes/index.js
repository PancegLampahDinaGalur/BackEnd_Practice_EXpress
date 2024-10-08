// const express = require("express");
// const router = express.Router();
// const controllers = require("../controllers");
// router.get("/api/v1/cars", controllers.cars.getCars);
// router.post("/api/v1/cars", controllers.cars.createCar);
// router.get("/api/v1/cars/:id", controllers.cars.getCarById);
// router.put("/api/v1/cars/:id", controllers.cars.updateCar);
// router.delete("/api/v1/cars/:id", controllers.cars.deleteCar);

// module.exports = router;  (router manual tanpa  midleware)

const controllers = require("../controllers");

module.exports = function(app){
    app.use('/api/v1/cars', controllers.cars);
    app.use('/api/v1/users', controllers.users);
     app.use('/api/v1/auth', controllers.auth);

    // app.use('/api/v1/cars', controllers.cars);
};