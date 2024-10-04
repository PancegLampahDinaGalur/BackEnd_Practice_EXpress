const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
<<<<<<< HEAD
 
=======

>>>>>>> 54feef687257eb0e60cfb23bcacb5295357e8753
router.get("/api/v1/cars", controllers.cars.getCars);
router.post("/api/v1/cars", controllers.cars.createCar);
router.get("/api/v1/cars/:id", controllers.cars.getCarById);
router.put("/api/v1/cars/:id", controllers.cars.updateCar);
router.delete("/api/v1/cars/:id", controllers.cars.deleteCar);
<<<<<<< HEAD
 
=======

>>>>>>> 54feef687257eb0e60cfb23bcacb5295357e8753
module.exports = router;