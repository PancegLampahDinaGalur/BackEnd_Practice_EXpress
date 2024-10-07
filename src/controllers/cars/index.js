// const pool = require("../../config/db");
const Joi = require("joi");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const BaseController = require('../base')
const CarModel = require('../../models/car')
const express = require("express");
const router = express.Router();

const cars = new CarModel();


const carSchema = Joi.object({
  name_car: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string(),
  manufactur: Joi.string().required(),
  is_driver: Joi.boolean().required(),
  img: Joi.string().uri().allow(null),
  description: Joi.string().allow(null),
  is_available: Joi.boolean(),
  license_number: Joi.string(),
  seat: Joi.number().min(2),
  baggage: Joi.number(),
  transmition: Joi.string(),
  year: Joi.string(),
})

class CarsController extends BaseController {
  constructor(model) {
    super(model);
    router.get("/", this.getAll);
    router.post("/", this.validation(carSchema), this.create);
    router.get("/:id", this.get);
    router.put("/:id", this.validation(carSchema), this.update);
    router.delete("/:id", this.delete);
  }
}



new CarsController(cars);

module.exports = router;





// class Cars{
//     async getCars(req, res){
//         try {
//             // const cars = await pool.query("SELECT name_car, year, type, manufactur, price, img FROM cars");
//             const cars = await prisma.cars.findMany({
//                 select : {
//                     name_car: true,
//                     year: true,
//                     type: true,
//                     manufactur: true,
//                     price: true,
//                     img: true
//                 }
//             })
//             res.status(200).json(cars);
//         } catch (error) {
//             res.status(500).json("Internal Server Error");
//             console.log({ message: error.message });
//         }
//     }

//     async getCarById(req, res){
//         const { id } = req.params;
//         console.log(id);
//         try {
//             // const car = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
//             const car = await prisma.cars.findUnique({
//                 where: {
//                     id: parseInt(id)
//                 }
//             })
//             if (!car) {
//                 return res.status(404).json({ message: "Car not found" });
//             }
//             // res.status(200).json(car.rows[0]);
//             res.status(200).json(car);
//         } catch (error) {
//             res.status(500).json("Internal Server Error");
//             console.log({ message: error.message });
//         } //if (!car) {
//         //      return res.status(404).json({ message: "Car not found" });
//         // }
//     }

//     async createCar(req, res){
//         const { name_car, year, type, manufactur, price, image, license_number, seat, baggage, transmition, description, is_driver, is_available } = req.body;
//         try {
//             // const newCar = await pool.query("INSERT INTO cars (name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [name_car, year, type, manufactur, price, image, license_number, seat, baggage, transmition, description, is_driver, is_available]);
//             // res.status(201).json({ message: "Car created successfully", car: newCar.rows[0] });
//             const newCar = await prisma.cars.create({
//                 data: {
//                     name_car: name_car,
//                     year: year,
//                     type: type,
//                     manufactur: manufactur,
//                     price: price,
//                     img: image,
//                     license_number: license_number,
//                     seat: seat,
//                     baggage: baggage,
//                     transmition: transmition,
//                     description: description,
//                     is_driver: is_driver,
//                     is_available: is_available
//                 }
//             })
//             res.status(201).json({ message: "Car created successfully", car: newCar });
//         } catch (error) {
//             res.status(500).json("Internal Server Error");
//             console.log({ message: error.message });
//         }
//     }

//     async updateCar(req, res){
//         const { id } = req.params;
//         const { name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available } = req.body;
//         try {
//             // const updatedCar = await pool.query("UPDATE cars SET name_car = $1, year = $2, type = $3, manufactur = $4, price = $5, img = $6, license_number = $7, seat = $8, baggage = $9, transmition = $10, description = $11, is_driver = $12, is_available = $13 WHERE id = $14 RETURNING *", [name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available, id]);
//             // res.status(200).json({ message: "Car updated successfully", car: updatedCar.rows[0] });
//             const updatedCar = await prisma.cars.update({
//                 where: {
//                     id: parseInt(id)
//                 },
//                 // data : req.body
//                 data: {
//                     name_car: name_car,
//                     year: year,
//                     type: type,
//                     manufactur: manufactur,
//                     price: price,
//                     img: img,
//                     license_number: license_number,
//                     seat: seat,
//                     baggage: baggage,
//                     transmition: transmition,
//                     description: description,
//                     is_driver: is_driver,
//                     is_available: is_available
//                 }
//             })
//             if (!updatedCar) {
//                 return res.status(404).json({ message: "Car not found" });
//             }
//             res.status(200).json({ message: "Car updated successfully", car: updatedCar });
//         } catch (error) {
//             res.status(500).json("Internal Server Error");
//             console.log({ message: error.message });
//         }
//     }

//     async deleteCar(req, res){
//         const { id } = req.params;
//         try {
//             // const deletedCar = await pool.query("DELETE FROM cars WHERE id = $1 RETURNING *", [id]);
//             const deletedCar = await prisma.cars.delete({
//                 where: {
//                     id: parseInt(id)
//                 }
//             })
//             if (deletedCar.rowCount === 0) {
//                 return res.status(404).json({ message: "Car not found" });
//             }
//             // res.status(200).json({ message: "Car deleted successfully", car: deletedCar.rows[0] });
//             res.status(200).json({ message: "Car deleted successfully", car: deletedCar });
//         } catch (error) {
//             res.status(500).json("Internal Server Error");
//             console.log({ message: error.message });
//         }
//     }

//     // this query can be SQL Injection
//     // async getCarById(req, res){
//     //     const { id } = req.params;
//     //     console.log(id);
//     //     try {
//     //         const car = await pool.query(`SELECT * FROM cars WHERE id = ${id}`);
//     //         res.status(200).json(car);
//     //     } catch (error) {
//     //         res.status(500).json("Internal Server Error");
//     //         console.log({ message: error.message });
//     //     }
//     // }
    
    
// }

// module.exports = new Cars();