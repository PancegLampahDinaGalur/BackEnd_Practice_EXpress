// const Joi = require("joi");
// const BaseController = require("../base");
// const OrderModel = require("../../models/order");
// const CarModel = require("../../models/car");
// const express = require("express");
// const router = express.Router();
// const { authorize, checkRole } = require("../../middlewares/authorization");
// const order = new OrderModel();
// const car = new CarModel();

// const orderSchema = Joi.object({
//   car_id: Joi.number().required(),
//   start_time: Joi.date().required(),
//   end_time: Joi.date().required(),
//   is_driver: Joi.boolean().required(),
// });

// const updateOrderSchema = Joi.object({
//   status: Joi.string().required(),
// });

// class OrderController extends BaseController {
//   constructor(model) {
//     super(model);
//     router.get("/", this.getAll);
//     router.post(
//       "/",
//       this.validation(orderSchema),
//       authorize,
//       checkRole(["customer"]),
//       this.create
//     );
//     router.get("/:id", this.get);
//     router.put(
//       "/:id",
//       this.validation(updateOrderSchema),
//       authorize,
//       checkRole(["customer"]),
//       this.update
//     );
//     router.delete("/:id", authorize, checkRole(["customer"]), this.delete);
//   }

//   create = async (req, res, next) => {
//     try {
//       const { car_id } = req.body;

//       // Check if the car exists and is available
//       const carExists = await car.getone({
//         where: { id: Number(car_id), is_available: true },
//       });
//       if (!carExists) {
//         return res
//           .status(404)
//           .json({ message: "Car not found or not available" });
//       }
//       // Extract the price from the car details
//       const price = carExists.price;

//       // Calculate the duration in hours
//       const startTime = new Date(req.body.start_time);
//       const endTime = new Date(req.body.end_time);
//       const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

//       // Calculate the total
//       const total = durationInHours * price;

//       const data = {
//         ...req.body,
//         // car_id: Number(req.body.car_id), // Ensure car_id is an integer
//         users_id: req.user.id,
//         status: "pending",
//         order_no: "INV/" + Date.now(),
//         is_driver: req.body.is_driver,
//         total,
//       };

//       console.log(data);
//       // Create the order
//       const newOrder = await this.model.set(data);

//       await car.update(req.body.car_id, { is_available: false });

//       return res.status(201).json(newOrder);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// }

// new OrderController(order);
// module.exports = router;

const Joi = require("joi");

const BaseController = require("../base");
const OrderModel = require("../../models/order");
const CarsModel = require("../../models/car");
const express = require("express");
const { authorize, checkRole } = require("../../middlewares/authorization");
const router = express.Router();

const order = new OrderModel();
const cars = new CarsModel();

const orderSchema = Joi.object({
  car_id: Joi.number().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  is_driver: Joi.boolean().required(),
});

class OrderController extends BaseController {
  constructor(model) {
    super(model);
    router.get("/", this.getAll);
    router.post("/", this.validation(orderSchema), authorize, this.create);
    // router.get("/:id", this.get);
    // router.put("/:id", this.validation(carSchema), authorize, checkRole(['admin']), this.update);
    // router.delete("/:id", this.delete);
  }

  create = async (req, res, next) => {
    try {
      const getCars = await cars.getone({
        where: {
          id: req.body.car_id,
          is_available: true,
          is_driver: req.body.is_driver,
        },
        select: {
          price: true,
        },
      });

      if (!getCars)
        return next(new ValidationError("Car not found or is not available!"));

      const getLastOrderToday = await this.model.count({
        create_dt: {
          lte: new Date(),
        },
      });
      console.log(getLastOrderToday, new Date());
      const currentDate = new Date();
      const startTime = new Date(req.body.start_time);
      const endTime = new Date(req.body.end_time);
      const total =
        getCars.price * ((endTime - startTime) / 1000 / 60 / 60 / 24);
      const invNumber = `INV/${currentDate.getFullYear()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${getLastOrderToday + 1}`;

      const [result, carUpdate] = await this.model.transaction([
        this.model.set({
          order_no: invNumber,
          start_time: startTime,
          end_time: endTime,
          is_driver: req.body.is_driver,
          status: "pending",
          is_expired: false,
          created_by: req.user.fullname,
          updated_by: req.user.fullname,
          total,
          cars: {
            connect: {
              id: req.body.car_id,
            },
          },
          users: {
            connect: {
              id: req.user.id,
            },
          },
        }),
        cars.update(req.body.car_id, { is_available: false }),
      ]);

      return res.status(200).json(
        this.apiSend({
          code: 200,
          status: "success",
          message: "Order created successfully",
          data: result,
        })
      );
    } catch (error) {
      return next(error);
    }
  };
}

new OrderController(order);

module.exports = router;
